import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from './model/Loan';
import { Pageable } from '../core/model/Pageable';
import { LoanPage } from './model/LoanPage';

@Injectable({
    providedIn: 'root',
})
export class LoanService {

    constructor(
        private http: HttpClient
    ) { }

    private baseUrl = 'http://localhost:8080/loan';

    getLoans(pageable: Pageable, title?: string, client?: number, date?: Date): Observable<LoanPage> {
        return this.http.post<LoanPage>(this.composeFindUrl(title, client, date), { pageable: pageable });
    }

    saveLoan(loan: Loan): Observable<void> {
        const { id } = loan;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;

        return this.http.put<void>(url, loan);
    }

    deleteLoan(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    private composeFindUrl(title?: string, client?: number, date?: Date): string {
        const params = new URLSearchParams();
        if (title) {
            params.set('title', title);
        }
        if (client) {
            params.set('client', client.toString());
        }
        if (date) {
            params.set('date', date.toISOString());
        }
        const queryString = params.toString();
        return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
    }
}
