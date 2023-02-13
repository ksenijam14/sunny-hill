import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginRegServisService } from '../servisi/login-reg-servis.service';

export interface DialogData {
}

@Component({
  selector: 'app-dialog-register',
  templateUrl: './dialog-register.component.html',
  styleUrls: ['./dialog-register.component.css']
})
export class DialogRegisterComponent implements OnInit {

  constructor(private servis: LoginRegServisService, private ruter:Router, public dialogRef: MatDialogRef<DialogRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  forma: FormGroup;
  message: string;
  showAlertErr: boolean = false;
  showAlertOK: boolean = false;

  ngOnInit(): void {
    this.forma = new FormGroup({
      ime_prezime: new FormControl('', [Validators.required]),
      kor_ime: new FormControl('', [Validators.required]),
      lozinka: new FormControl('', 
      [
        Validators.required,
        Validators.pattern(/^[A-Z]+[a-zA-Z]*(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{7,12}$/) //7 zato sto prvo slovo gleda posebno
      ]),
      re_lozinka: new FormControl('', [Validators.required]),
      telefon: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email])
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

  register(){
    console.log(this.forma);
    console.log(this.forma.value);
    this.showAlertErr = false;
    this.showAlertOK = false;
    if(this.forma.value.lozinka != this.forma.value.re_lozinka){
        this.showAlertErr = true;
        this.message="Ponovite unos lozinke!"
        this.forma.get('re_lozinka').reset();
        return;
    } 
    const form = new FormData();
    form.append('ime_prezime', this.forma.value.ime_prezime);
    form.append('kor_ime', this.forma.value.kor_ime);
    form.append('lozinka', this.forma.value.lozinka);
    // if(this.forma.value.telefon == ''){
    //   form.append('telefon', null);
    // }else{
    //   form.append('telefon', this.forma.value.telefon);
    // }
    form.append('telefon', this.forma.value.telefon);
    form.append('email', this.forma.value.email);

    console.log(form);

    this.servis.registerBuyer(form).subscribe((res:any)=>{
      console.log(res);
      //i ovde treba samo pokazati alert da je korisnik dodat u bazu
      this.message = res.message;
      this.showAlertErr = false;
      this.showAlertOK = true;
      console.log("alert", this.showAlertOK)
    },
    (error)=>{
      console.log('usla u error')
      this.showAlertOK = false;
      this.showAlertErr = true;
      this.handleTheError(error);
    }
    )
  }

}
