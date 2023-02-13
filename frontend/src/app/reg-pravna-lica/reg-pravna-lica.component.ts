import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegServisService } from '../servisi/login-reg-servis.service';

@Component({
  selector: 'app-reg-pravna-lica',
  templateUrl: './reg-pravna-lica.component.html',
  styleUrls: ['./reg-pravna-lica.component.css']
})
export class RegPravnaLicaComponent implements OnInit {
  
  forma: FormGroup;
  message: string;
  showAlertErr: boolean = false;
  showAlertOK: boolean = false;
  
  constructor(private servis: LoginRegServisService, private ruter:Router) { }

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
      telefon: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      nazivP: new FormControl('', [Validators.required]),
      drzava: new FormControl('', [Validators.required]),
      planina: new FormControl('', [Validators.required]),
      adresaP: new FormControl('', [Validators.required]),
      PIB: new FormControl('', [Validators.required, Validators.pattern("^[1-9][0-9]{8}$")]), //8 jer on prvu cifru gleda posebno, a onda ponavlja [0-9] 8 puta
      maticni: new FormControl('', [Validators.required]),
      slika: new FormControl(''), ////ovo mi je formControlName
      fileSource: new FormControl('') //ovo mi je fajl source
      });
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.forma.controls[controlName].hasError(errorName);
  }
  
  handleTheError(error: HttpErrorResponse){
    console.log("usla u handler")
    this.message = error.error.message;
  }

  losaVelicinaSlike:boolean = false;

  onFileChange(event) {
    if (event.target.files.length > 0) {
      var img = new Image();
      img.src = window.URL.createObjectURL(event.srcElement.files[0]);
      img.onload = () =>{
        console.log(img.width); console.log(img.height);
        if(img.width < 100 || img.width > 1500 || img.height < 100 && img.height > 1500){
          console.log("Losa velicina slike");
          this.losaVelicinaSlike = true;
          return; //vratice se iz funkcije i fileSource ce biti prazan, mozda mi treba provera i za to u validaciji
        }
      }
      //ako dodje dovde znaci sve je okej
      this.losaVelicinaSlike = false;
      const file = event.target.files[0];
      console.log(file);
      this.forma.patchValue({
        fileSource: file
      });
      console.log("fileSource", this.forma.value.fileSource)
    }
  }
  
  registerPravnoLice(){
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
    if(this.forma.value.slika=="" || this.losaVelicinaSlike == true){
      this.showAlertErr = true;
      this.message="Niste predali sliku grba ili je velicina slike losa!"
      return;
    } 
    const form = new FormData();
    form.append('ime_prezime', this.forma.value.ime_prezime);
    form.append('kor_ime', this.forma.value.kor_ime);
    form.append('lozinka', this.forma.value.lozinka);
    form.append('telefon', this.forma.value.telefon);
    form.append('email', this.forma.value.email);
    form.append('nazivP', this.forma.value.nazivP);
    form.append('drzava', this.forma.value.drzava);
    form.append('planina', this.forma.value.planina.toLowerCase());
    form.append('adresaP', this.forma.value.adresaP);
    form.append('PIB', this.forma.value.PIB);
    form.append('maticni', this.forma.value.maticni);
    form.append('slika', this.forma.get('fileSource').value);

    console.log(form);

    this.servis.register(form).subscribe((res:any)=>{
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
