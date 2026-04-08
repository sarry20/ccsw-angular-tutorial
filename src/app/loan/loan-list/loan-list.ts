import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import { Pageable } from '../../core/model/Pageable';
import { Loan } from '../model/Loan';
import { LoanService } from '../loan.service';
import { LoanEdit } from '../loan-edit/loan-edit';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../../client/model/Client';
import { ClientService } from '../../client/client.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Game } from '../../game/model/Game';
import { GameService } from '../../game/game.service';

@Component({
    selector: 'app-loan-list',
    imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule, MatDatepickerModule],
    templateUrl: './loan-list.html',
    styleUrl: './loan-list.scss',
})
export class LoanList implements OnInit {
    pageNumber = 0;
    pageSize = 5;
    totalElements = 0;

    dataSource = new MatTableDataSource<Loan>();
    displayedColumns: string[] = ['id', 'title', 'clientName', 'startDate', 'endDate', 'action'];

    filterClient: Client;
    filterTitle: Game;
    filterFecha: Date;
    clients: Client[];
    games: Game[];

    constructor(private loanService: LoanService, private clientService: ClientService, private gameService: GameService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.clientService.getClients().subscribe((clients) => {
            this.clients = clients;
        });
        this.gameService.getGames().subscribe((games) => {
            this.games = games;
        });
        this.loadPage();
    }

    onCleanFilter(): void {
        this.filterTitle = null;
        this.filterClient = null;
        this.filterFecha = null;
        this.onSearch();
  }

    onSearch(): void {
        this.loadPage();
    }

    loadPage(event?: PageEvent) {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        this.loanService.getLoans(pageable, this.filterTitle?.title, this.filterClient?.id, this.filterFecha).subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    createLoan() {
        const dialogRef = this.dialog.open(LoanEdit, {
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    editLoan(loan: Loan) {
        const dialogRef = this.dialog.open(LoanEdit, {
            data: { loan: loan },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    deleteLoan(loan: Loan) {
        const dialogRef = this.dialog.open(DialogConfirmation, {
            data: {
                title: 'Eliminar préstamo',
                description:
                    'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loanService.deleteLoan(loan.id).subscribe((result) => {
                    this.ngOnInit();
                });
            }
        });
    }
}
