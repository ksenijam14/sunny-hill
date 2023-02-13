import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { KlijentService } from '../servisi/klijent.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { RezSki } from '../models/rezSki';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rez-ski',
  templateUrl: './rez-ski.component.html',
  styleUrls: ['./rez-ski.component.css']
})
export class RezSkiComponent implements OnInit {

  constructor(private servis: KlijentService, private ruter:Router, private route: ActivatedRoute) { }
  
  ulogovan:Korisnik;
  idSkole: String;
  detaljiSk: Korisnik;
  cena_casa: number;
  cena_opreme: number;
  forma: FormGroup;
  instruktori: String[];
  vremenaSlobodna:String[];
  valid: Boolean = false;
  time: String;

  message: string;
  showAlertErr: boolean = false;
  showAlertOK: boolean = false;
  
  imageObject: Array<object>;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`)

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    this.imageObject = [];
    console.log("ulogovan",this.ulogovan);
    this.vremenaSlobodna = ['08', '09', '10', '11', '12', '13', '14', '15'];
    this.forma = new FormGroup({
      instruktor: new FormControl('', [Validators.required]),
      datum: new FormControl('', [Validators.required]),
      vreme: new FormControl(''),
      renta_opreme: new FormControl(''),
      status: new FormControl('nova'),
      klijent: new FormControl(this.ulogovan.kor_ime)
    });
    this.route.queryParams
      .subscribe(params => {
        if(params['idSkole']){
          console.log("parametar", params['idSkole']);
          this.idSkole = params['idSkole'];
          this.servis.detaljiSkole(this.idSkole).subscribe((res:Korisnik)=>{
            this.detaljiSk= res;
            console.log("detalji slike", this.detaljiSk);
            this.detaljiSk[0].detalji_skole[0]['slike'].forEach(slika => {
              let path = slika;
              this.imageObject.push({image:`http://localhost:4000/firma/${path}`})
            })

            console.log("image object", this.imageObject);

            this.detaljiSk[0].detalji_skole.forEach(element => {
              this.instruktori = element.instruktori;
              console.log('instruktor moji', this.instruktori);
            });
            this.cena_casa = this.detaljiSk[0].detalji_skole[0].cena_casa;
            this.cena_opreme = this.detaljiSk[0].detalji_skole[0].cena_opreme;
            console.log("detalji", this.detaljiSk[0].detalji_skole[0].cena_casa);
            //console.log("Instruktori", this.detaljiSk[0].detalji_skole[0].instruktori[0]);
          })
        }else{
          console.log("nema parametra query-a")
        }
      }
    );
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.forma.controls[controlName].hasError(errorName);
  }

  handleTheError(error: HttpErrorResponse){
    console.log("usla u handler")
    this.message = error.error.message;
  }

  vreme(time){
    //alert(time);
    this.forma.value.vreme = time;
    this.time = time
    console.log("vreme", this.forma.value.vreme);
    console.log(this.forma);
    this.valid = true;
  }

  rezervisi(){
    console.log("vreme casa", this.time);
    this.forma.value.vreme = this.time;
    console.log(this.forma.value);

    this.servis.rezSkiCas(this.forma.value, this.idSkole).subscribe((res:any)=>{
      console.log(res);
      if(this.forma.value.renta_opreme == true){
        let ukupno = 0;
        ukupno = this.cena_casa + this.cena_opreme;
        this.message = "Uspešno poslata rezervacija! Ukupno za uplatu: " + ukupno + " din";
      }else{
        this.message = "Uspešno poslata rezervacija! Ukupno za uplatu: " + this.cena_casa + " din";
      }
      this.showAlertErr = false;
      this.showAlertOK = true;
    },
    (error)=>{
      console.log('usla u error')
      this.showAlertOK = false;
      this.showAlertErr = true;
      this.handleTheError(error);
    }
    )
  }

  events: Date;
  rez: RezSki;
  slobVremena: String[];

  deleteElement(arr, n, x)
  {
    // Search x in array
    let i;
    for (i=0; i<n; i++)
        if (arr[i] == x)
          break;
  
    // If x found in array
    if (i < n)
    {
      // reduce size of array and move all
      // elements on space ahead
      n = n - 1;
      for (let j=i; j<n; j++)
          arr[j] = arr[j+1];
    }
  
    return n;
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.events = event.value;
    this.slobVremena = [];
    let mojaVremena = [];
    console.log("pre sV", this.slobVremena);
    console.log(this.events);
    console.log("instr", this.forma.value.instruktor);
    this.servis.dohvRezervacije(this.forma.value.instruktor, this.events).subscribe((res:RezSki)=>{
      console.log(res);
      this.rez = res;
      for(let i=0; i<this.vremenaSlobodna.length; i++){
        this.slobVremena.push(this.vremenaSlobodna[i]);
      }
      console.log("duzina", this.rez[0]!=null);
      if(this.rez[0]!=null){
        this.rez[0].rezervacije.forEach(element => {
          let dat = new Date(element['datum'])
          if(dat.getTime() == this.events.getTime()){
            console.log("isti");
            mojaVremena.push(element.vreme);  //8 i 13
          }else{
            console.log("nisu")
          }
        });
        console.log("mV post", mojaVremena);
        mojaVremena.forEach(vreme_out => {
          this.deleteElement(this.slobVremena, this.slobVremena.length, vreme_out);
          this.slobVremena.pop();
        });
        console.log("sV post", this.slobVremena);
      }
      console.log("sV post 2", this.slobVremena);
    })
  }
}
