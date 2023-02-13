import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { DialogRegisterComponent } from '../dialog-register/dialog-register.component';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-meni-classic',
  templateUrl: './meni-classic.component.html',
  styleUrls: ['./meni-classic.component.css']
})
export class MeniClassicComponent implements OnInit {

  constructor(private ruter:Router, public dialog: MatDialog, public dialog_reg: MatDialog) { }
  
  ulogovan:Korisnik;
  admin: Boolean=false;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    if(this.ulogovan?.tip == 'admin'){
      this.admin = true;
    }
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
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

  mojProfil(){
    if(this.ulogovan.tip == 'planinari'){
      this.ruter.navigate(['/firme/planinari']);
    }else if(this.ulogovan.tip =='ski_skola'){
      this.ruter.navigate(['firme/ski_skola']);
    }else if(this.ulogovan.tip == 'hotel' || this.ulogovan.tip == 'apartman'){
      this.ruter.navigate(['firme/smestaj']);
    }else if(this.ulogovan.tip =='kupac'){
      this.ruter.navigate(['/klijent']);
    }else{
      this.ruter.navigate(['admin/admin-page']);
    }
  }

  changePass(){
    this.ruter.navigate(['/promena-lozinke']);
  }

  zahtevi_reg_admin(){
    this.ruter.navigate(['admin/admin-page/zahtevi']);
  }

  pregled_komentara(){
    this.ruter.navigate(['admin/admin-page/pregled-komentara']);
  }

}
