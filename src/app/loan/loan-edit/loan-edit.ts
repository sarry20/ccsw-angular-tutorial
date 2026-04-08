import { Component, Inject, OnInit } from '@angular/core';
import { Game } from '../../game/model/Game';
import { Loan } from '../model/Loan';
import { Client } from '../../client/model/Client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GameService } from '../../game/game.service';
import { ClientService } from '../../client/client.service';
import { LoanService } from '../loan.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AlertMessage } from '../../core/alert-message/alert-message';

@Component({
    selector: 'app-loan-edit',
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule],
    templateUrl: './loan-edit.html',
    styleUrl: './loan-edit.scss',
})
export class LoanEdit implements OnInit {
    loan: Loan;
    games: Game[];
    clients: Client[];
    startPicker: Date;
    endPicker: Date;

    constructor(
        public dialogRef: MatDialogRef<LoanEdit>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private gameService: GameService,
        private loanService: LoanService,
        private clientService: ClientService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.loan = this.data.loan ? Object.assign({}, this.data.loan) : new Loan();

        this.gameService.getGames().subscribe((games) => {
            this.games = games;

            if (this.loan.game != null && this.loan.game.category != null) {
                const gameFilter: Game[] = games.filter(
                    (game) => game.category.id == this.data.loan.game.category.id
                );
                if (gameFilter != null) {
                    this.loan.game = gameFilter[0];
                }
            }
        });

        this.clientService.getClients().subscribe((clients) => {
            this.clients = clients;

            if (this.loan.client != null) {
                const clientFilter: Client[] = clients.filter(
                    (client) => client.id == this.data.loan.client.id
                );
                if (clientFilter != null) {
                    this.loan.client = clientFilter[0];
                }
            }
        });
    }

    onSave() {
        this.loanService.saveLoan(this.loan).subscribe({
            next: () => {
                this.dialogRef.close();
            },
            error: (err) => {
                this.dialog.open(AlertMessage, {
                    data: {
                        title: 'Error',
                        description: ` ${err.error.message || err.message}`,
                    },
                });
//                alert(` ${err.error.message || err.message}`);
            }
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}