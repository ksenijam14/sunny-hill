import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { DialogRegisterComponent } from '../dialog-register/dialog-register.component';
import { Korisnik } from '../models/korisnik';
import { Planina } from '../models/planina';
import { FirmaServisService } from '../servisi/firma-servis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ruter:Router, public dialog: MatDialog, public dialog_reg: MatDialog,
    private servis: FirmaServisService) {
      this.minDate = new Date(2022,8,15);
     }

  forma: FormGroup;
  ulogovan: Korisnik;
  svePlanine: Planina[];
  mojePlanine: Planina[];
  minDate: Date;
  
  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    this.mojePlanine = [];
    this.forma = new FormGroup({
      drzava: new FormControl(''),
      planina: new FormControl(''),
      tip_odmora: new FormControl('', [Validators.required]),
      datum_OD: new FormControl(''),
      datum_DO: new FormControl(''),
      br_osoba: new FormControl(''),
      tip_smestaja: new FormControl('')
    });
    this.servis.dohvSvePlanine().subscribe((res:any)=>{
      this.svePlanine = res
      console.log(this.svePlanine);
    })
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.forma.controls[controlName].hasError(errorName);
  }

  kor_ime:string;
  pass:string;
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

  getPlanine(event){
    this.mojePlanine = [];
    console.log(event.value);
    event.value.forEach(drzava => {
      this.svePlanine.forEach(plan => {
        if(plan.drzava == drzava){
          this.mojePlanine.push(plan);
        }
      });
    });
    console.log("moje", this.mojePlanine);
  }

  pronadji(){
    if(this.forma.valid){
      this.ruter.navigate(
        ['/pretraga'],
        { queryParams: { 
          drzava: this.forma.value.drzava,
          planina: this.forma.value.planina,
          tip_odmora: this.forma.value.tip_odmora,
          datum_od: this.forma.value.datum_OD,
          datum_do: this.forma.value.datum_DO,
          tip_smestaja: this.forma.value.tip_smestaja
        } }
      );
    }
    
  }

  ski_skole(){
    this.ruter.navigate(['/ski_skole']);
  }

  plan_ture(){
    this.ruter.navigate(['/planinarske_ture'])
  }

  smestaj(){
    this.ruter.navigate(['/smestaj'])
  }

  mojProfil(){
    if(this.ulogovan.tip=="kupac"){
      this.ruter.navigate(['/klijent']);
    }else if(this.ulogovan.tip=='planinari'){
      this.ruter.navigate(['/firme/planinari']);
    }else if(this.ulogovan.tip=='ski_skola'){
      this.ruter.navigate(['firme/ski_skola']);
    }else{
      this.ruter.navigate(['firme/smestaj']);
    }
    
  }

  changePass(){
    this.ruter.navigate(['/promena-lozinke']);
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

}
