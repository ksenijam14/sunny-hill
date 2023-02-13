import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { LoginRegServisService } from '../servisi/login-reg-servis.service';

export interface DialogData {
  
}

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {

  constructor(private servis: LoginRegServisService, private ruter:Router, public dialogRef: MatDialogRef<DialogLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

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

  onNoClick(): void {
    this.dialogRef.close();
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
          if(user.tip=="firma"){
            console.log("ovde je firma");
            this.dialogRef.close();
            this.ruter.navigate(['/firme']);
          }else if(user.tip=="hotel" || user.tip=="apartman"){
            this.dialogRef.close();
            this.ruter.navigate(['/firme/smestaj']);
          }else if(user.tip=="ski_skola"){
            this.dialogRef.close();
            this.ruter.navigate(['/firme/ski_skola']);
          }else if(user.tip=="planinari"){
            this.dialogRef.close();
            this.ruter.navigate(['/firme/planinari']);
          }else if(user.tip=="kupac"){
            this.dialogRef.close();
            this.ruter.navigate(['/klijent']);
          }else if(user.tip=="admin" && this.ruter.url=='/admin'){
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
