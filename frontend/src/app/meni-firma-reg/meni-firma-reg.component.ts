import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { DialogRegisterComponent } from '../dialog-register/dialog-register.component';

@Component({
  selector: 'app-meni-firma-reg',
  templateUrl: './meni-firma-reg.component.html',
  styleUrls: ['./meni-firma-reg.component.css']
})
export class MeniFirmaRegComponent implements OnInit {

  constructor(private ruter:Router, public dialog: MatDialog, public dialog_reg: MatDialog) { }

  ngOnInit(): void {
  }

  loginDialog(): void {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '500px',
    });
  }

  registerDialog(): void{
    const dialogRef = this.dialog_reg.open(DialogRegisterComponent, {
      width: '500px',
    });
  }

  registerPravnoLice(){
    this.ruter.navigate(['/firma_reg']);
  }

  changePass(){
    this.ruter.navigate(['/promena-lozinke']);
  }

}
