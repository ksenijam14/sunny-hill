import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DetaljiFirme } from '../models/detaljiFirme';
import { Korisnik } from '../models/korisnik';
import { FirmaServisService } from '../servisi/firma-servis.service';

@Component({
  selector: 'app-nova-tura',
  templateUrl: './nova-tura.component.html',
  styleUrls: ['./nova-tura.component.css']
})
export class NovaTuraComponent implements OnInit {
  

  constructor(private servis: FirmaServisService, private ruter:Router) { }

  ulogovan: Korisnik; //planinarsko drustvo
  detalji: DetaljiFirme;
  planine: String[];
  forma: FormGroup;
  message: string;
  showAlertErr: boolean = false;
  showAlertOK: boolean = false;

  filesPlaninari:string [] = [];

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("Ulogovan planinar", this.ulogovan);
    this.ulogovan.tip = "Planinarsko drustvo";
    this.servis.getDetaljiFirme(this.ulogovan.kor_ime).subscribe((det:DetaljiFirme)=>{
      this.detalji = det;
      console.log("detalji planinari", this.detalji);
      this.planine = this.detalji.planine;
      console.log("planine u ponudi", this.planine);
    })

    this.forma = new FormGroup({
      naslov: new FormControl('', [Validators.required]),
      opis: new FormControl('', [Validators.required]),
      program: new FormControl('', [Validators.required]),
      saveti: new FormControl(''),
      cena: new FormControl('', [Validators.required]),
      ukljuceno: new FormControl('', [Validators.required]),
      nije_ukljuceno: new FormControl('', [Validators.required]),
      napomene: new FormControl('', [Validators.required]),
      lokacija: new FormControl('', [Validators.required]), //tj. planina
      datum_od: new FormControl('', [Validators.required]),
      datum_do: new FormControl('', [Validators.required]),
      hint_reci: new FormControl('', [Validators.required]),
      media: new FormControl('')
    })
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.forma.controls[controlName].hasError(errorName);
  }
  
  onFileChange(event){
    for (var i = 0; i < event.target.files.length; i++) { 
      this.filesPlaninari.push(event.target.files[i]);
    }
  }

  handleTheError(error: HttpErrorResponse){
    console.log("usla u handler")
    this.message = error.error.message;
  }
  
  unos_ture(){
    console.log("forma", this.forma.value);
    console.log("ukljuceno", this.forma.value.ukljuceno);
    let br_dana = ((this.forma.value.datum_do - this.forma.value.datum_od)/(1000*3600*24)) + 1;
    console.log("br_dana", br_dana.toString());

    if(this.filesPlaninari.length == 0){
      this.message = "Morate da prilozite makar jednu sliku!"
      this.showAlertOK = false;
      this.showAlertErr = true;
      return;
    }
    const form = new FormData();
    form.append('idF', this.ulogovan._id);
    form.append('kor_ime', this.ulogovan.kor_ime);
    form.append('nazivP', this.ulogovan.nazivP);

    form.append('naslov', this.forma.value.naslov);
    form.append('opis', this.forma.value.opis);
    form.append('program', this.forma.value.program);
    form.append('saveti', this.forma.value.saveti);
    form.append('cena', this.forma.value.cena);
    form.append('ukljuceno', this.forma.value.ukljuceno);
    form.append('nije_ukljuceno', this.forma.value.nije_ukljuceno);
    form.append('napomene', this.forma.value.napomene);
    form.append('lokacija', this.forma.value.lokacija);
    form.append('datum_od', this.forma.value.datum_od);
    form.append('datum_do', this.forma.value.datum_do);
    form.append('hint_reci', this.forma.value.hint_reci);
    form.append('br_dana', br_dana.toString());

    for (var i = 0; i < this.filesPlaninari.length; i++) { 
      form.append("file[]", this.filesPlaninari[i]);
    }
    this.servis.novaTura(form).subscribe((res:any)=>{
      console.log(res);
      //this.forma.reset();
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
