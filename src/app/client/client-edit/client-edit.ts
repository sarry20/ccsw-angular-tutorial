import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../model/Client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './client-edit.html',
  styleUrl: './client-edit.scss',
})
export class ClientEdit implements OnInit {
  client: Client;

  constructor(
    public dialogRef: MatDialogRef<ClientEdit>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.client = this.data.client ? Object.assign({}, this.data.client) : new Client();
  }

  onSave() {
    this.clientService.saveClient(this.client).subscribe({
      next: (resp) => {
        this.dialogRef.close();
      },
      error: (error) => {
        alert(`El cliente esta duplicado`);
      },

    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
