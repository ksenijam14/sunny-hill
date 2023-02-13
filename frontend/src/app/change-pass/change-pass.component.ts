import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { LoginRegServisService } from '../servisi/login-reg-servis.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  constructor(private servis: LoginRegServisService, private ruter:Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    this.forma = new FormGroup({
      stara_pass: new FormControl('', [Validators.required]),
      lozinka: new FormControl('', 
      [
        Validators.required,
        Validators.pattern(/^[A-Z]+[a-zA-Z]*(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{7,12}$/) //7 zato sto prvo slovo gleda posebno
      ]),
      re_lozinka: new FormControl('', [Validators.required])
    });
  }

  forma: FormGroup;
  message: string;
  showAlertErr: boolean = false;
  ulogovan: Korisnik;

  public myError = (controlName: string, errorName: string) =>{
    return this.forma.controls[controlName].hasError(errorName);
  }

  handleTheError(error: HttpErrorResponse){
    console.log("usla u handler")
    this.message = error.error.message;
  }

  changePass(){
    console.log("kor_ime", this.ulogovan.kor_ime);
    console.log('lozinka od ulogovanog',this.ulogovan.lozinka);
    console.log('stara pass', this.forma.value.stara_pass);
    console.log('nova', this.forma.value.lozinka);
    console.log('ponovljena', this.forma.value.re_lozinka);

    if(this.forma.value.stara_pass != this.ulogovan.lozinka){
      this.showAlertErr = true;
      this.message="Ponovite unos lozinke!"
      this.forma.get('stara_pass').reset();
      return;
    }
    if(this.forma.value.lozinka != this.forma.value.re_lozinka){
      this.showAlertErr = true;
      this.message="Ponovite unos lozinke!"
      this.forma.get('re_lozinka').reset();
      return;
    }

    this.servis.changePass(this.ulogovan.kor_ime, this.forma.value.lozinka).subscribe((res:any)=>{
      console.log(res);
      //ako udje ovde znaci da smo sve lepo odradili
      //samo treba korisnika prebaciti na home page i izlogovati ga
      //da bi se ulogovao sa novim kredencijalima
      this.showAlertErr = false;
      //let user = localStorage.getItem('loggedInUser');
      localStorage.removeItem('loggedInUser');
      this.ruter.navigate(['']);
    })

  }

}

