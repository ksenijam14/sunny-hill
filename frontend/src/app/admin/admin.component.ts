import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { LoginRegServisService } from '../servisi/login-reg-servis.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private servis: LoginRegServisService, private ruter:Router) { }

  forma: FormGroup;
  message: string;
  showAlertErr: boolean = false;

  ngOnInit(): void {
    this.forma = new FormGroup({
      kor_ime: new FormControl('', [Validators.required]),
      lozinka: new FormControl('', [Validators.required])
      });
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.forma.controls[controlName].hasError(errorName);
  }

  handleTheError(error: HttpErrorResponse){
    console.log("usla u handler")
    this.message = error.error.message;
  }

  
  login(){
    console.log(this.forma);
    console.log(this.forma.value.kor_ime, this.forma.value.lozinka);
    this.showAlertErr = false;
    //prosledicu servisu value od forme i to ce biti polja koja sam popunila
    this.servis.login(this.forma.value).subscribe((user:Korisnik)=>{
      console.log(user);
      if (user){//ako nadje korisnika, sigurno ce ga naci ako je ovde, a ne u error-u
        console.log("status",user.status);
        if (user.status=="aktivan" || user.status==undefined){ 
          if(user.tip=="admin" && this.ruter.url=='/admin'){
            this.ruter.navigate(['admin/admin-page']);
          }else{
            this.showAlertErr = true;
            this.message = "Nemate mogucnost pristupa nalogu!";
            return;
          }
        }else if(user.status=="neaktivan" || user.status=="kreiran"){
          this.showAlertErr = true;
          this.message = "Nemate mogucnost pristupa nalogu!";
          return;
        }
      }
      //i ovde treba sada da ode na odredjenu stranicu u zavisnosti od toga kog je tipa korisnik (kupac ili preduzece)
      //admin ne sme sa javno vidljive stranice da se uloguje
      //ako pokusa access denied, a ako je na svojoj stranici onda moze
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      console.log(this.ruter.url);
      // if(this.ruter.url=='/admin'){this.ruter.navigate(['/admin/admin_data'])}
      // else this.ruter.navigate(['/kupac']);  //ili preduzece (prodavnica, ugostitelj)
    },
    (error)=>{ //ovde ce da udje ako ne nadje user-a sa korisnickim imenom  i lozinkom
      console.log('usla u error')
      this.showAlertErr = true;
      this.handleTheError(error);
    }
    )

  }


}
