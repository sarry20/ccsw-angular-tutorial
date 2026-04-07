import { TestBed } from '@angular/core/testing';

import { Loan } from './model/Loan';

describe('Loan', () => {
    let service: Loan;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(Loan as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
