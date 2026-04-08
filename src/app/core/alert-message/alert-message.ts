import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-message',
  imports: [MatButtonModule],
  templateUrl: './alert-message.html',
  styleUrl: './alert-message.scss',
})
export class AlertMessage implements OnInit {
  title: string;
  description: string;

  constructor(
    public dialogRef: MatDialogRef<AlertMessage>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.description;
  }

  onClick() {
    this.dialogRef.close();
  }
}

