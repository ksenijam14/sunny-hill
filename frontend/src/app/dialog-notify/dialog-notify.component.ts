import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-notify',
  templateUrl: './dialog-notify.component.html',
  styleUrls: ['./dialog-notify.component.css']
})
export class DialogNotifyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogNotifyComponent>,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
