import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetaljiFirme } from '../models/detaljiFirme';
import { Korisnik } from '../models/korisnik';
import { PlaninskaTura } from '../models/planinskaTura';
import { RezSki } from '../models/rezSki';
import { RezTura } from '../models/rezTura';
import { FirmaServisService } from '../servisi/firma-servis.service';
import { KlijentService } from '../servisi/klijent.service';

@Component({
  selector: 'app-odobrene-rez',
  templateUrl: './odobrene-rez.component.html',
  styleUrls: ['./odobrene-rez.component.css']
})
export class OdobreneRezComponent implements OnInit {

  constructor(private servis: FirmaServisService, private servisK: KlijentService, private ruter:Router) { }

  sviKorisnici: Korisnik[];
  ulogovan: Korisnik;
  detaljiSk: DetaljiFirme;
  rezSki: RezSki[];
  rezSkiIspis: RezSki[]; //mora ovako jer on uzme prvo sta se dodeli rezSki kad radi u html-u
  
  rezPlan: RezTura[];
  sveTure: PlaninskaTura[];
  naslovTure: String[];
  rezTura: any[]; //Rez je tip rezervacije ture
  
  rezSm: any[]; 
  smestaj: Korisnik;

  showAlertErr: boolean[];
  showAlertOK: boolean[];
  message: string;
  odobreneCount: number;
  nema_odobrenih: boolean = false;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("ulogovan", this.ulogovan);
    this.showAlertErr = [];
    this.showAlertOK = [];
    this.odobreneCount = 0;
    this.servis.getAllUsers().subscribe((res:Korisnik[])=>{
      this.sviKorisnici = res;
      console.log("svi_kor", this.sviKorisnici)
      this.servis.getDetaljiFirme(this.ulogovan.kor_ime).subscribe((res2:DetaljiFirme)=>{
        this.detaljiSk = res2;
        console.log("detalji", this.detaljiSk);
        if (this.ulogovan.tip=='ski_skola'){
          this.servis.dohvRezervacijeSkole(this.ulogovan._id).subscribe((res3:RezSki[])=>{
            this.rezSki = res3;
            console.log("rezSki", this.rezSki);
            this.rezSki.forEach(element => {
              this.detaljiSk.instruktori.forEach(instr => {
                if(instr['_id'] == element.id_instruktora){
                  element.id_instruktora = instr['ime_prezime'];
                }
              });
              element.rezervacije.forEach(rezer => {
                // this.odobreneCount+=1;
                if(rezer['status'] == 'odobrena'){
                  this.odobreneCount+=1;
                  this.showAlertErr.push(false);
                  this.showAlertOK.push(false);
                }
                this.sviKorisnici.forEach(kupac => {
                  if(rezer['klijent'] == kupac.kor_ime){
                    rezer['klijent'] = kupac.ime_prezime
                  }
                });
               
              });
              this.rezSkiIspis = this.rezSki;
              console.log("novo", this.rezSki);
              element.rezervacije.sort((a, b)=> {
                if (a['datum'] < b['datum']){
                  return -1;
                }
                if (a['datum'] > b['datum']){
                  return 1;
                }
                return 0;
              })
            });
            if(this.odobreneCount == 0){
              this.nema_odobrenih = true;
            }else{
              this.nema_odobrenih = false;
            }
          })
        }else if(this.ulogovan.tip=='hotel' || this.ulogovan.tip=='apartman'){
          this.servisK.detaljiSmestaja(this.ulogovan._id).subscribe((res:Korisnik)=>{
            this.smestaj= res;
            this.rezSm = this.smestaj[0].detalji_hotela[0].rezervacije;
            console.log("rezervacije", this.smestaj[0].detalji_hotela[0].rezervacije);
          })
        }else if (this.ulogovan.tip=='planinari'){
          this.servis.dohvRezervacijePlan(this.ulogovan._id).subscribe((res:any)=>{
            this.servis.dohvRezervacijePlan(this.ulogovan._id).subscribe((res:any)=>{
              this.rezPlan = res;
              console.log('rezPlan', this.rezPlan);
              this.naslovTure = [];
              this.rezTura = [];
              this.servis.dohvSvePlanTura(this.ulogovan._id).subscribe((res:PlaninskaTura[])=>{
                this.sveTure = res;
                console.log('ture sve', this.sveTure);
                this.rezPlan.forEach(rezPlan => {
                  this.sveTure.forEach(tura => {
                    if(tura._id == rezPlan.idTure){
                      this.naslovTure.push(tura.naslov);
                      rezPlan.rezervacije.forEach(rez => {
                        if(rez['status'] == 'odobrena'){
                          this.odobreneCount+=1;
                          this.showAlertErr.push(false);
                          this.showAlertOK.push(false);
                        }
                        console.log("alertOK", this.showAlertOK);
                        console.log("alertErr", this.showAlertErr);
                        this.sviKorisnici.forEach(kupac => {
                          if(rez['klijent'] == kupac.kor_ime){
                            rez['klijent'] = kupac.ime_prezime
                          }
                        });
                        this.rezTura.push({naslov: tura.naslov, rezervacija: rez, cena: tura.cena});
                      });
                    }
                  });
                });
                if(this.odobreneCount == 0){
                  this.nema_odobrenih = true;
                }else{
                  this.nema_odobrenih = false;
                }
                console.log("naslovi", this.naslovTure)
                console.log("rezTura", this.rezTura);
                console.log(this.nema_odobrenih);
              })
            })
          })
        }
      })
    })
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

  handleTheError(error: HttpErrorResponse){
    console.log("usla u handler")
    this.message = error.error.message;
  }

  odbijRezSki(idRez, index){
    this.servis.odbijRezSki(idRez).subscribe((res:any)=>{
      console.log(res);
      this.message = res.message;
      this.showAlertErr[index] = false;
      this.showAlertOK[index] = true;
      window.setTimeout(()=>{
        this.showAlertOK[index] = false;
      }, 4000);
    },
    (error)=>{
      console.log('usla u error')
      this.showAlertOK[index] = false;
      this.showAlertErr[index] = true;
      this.handleTheError(error);
      window.setTimeout(()=>{
        this.showAlertErr[index] = false;
      }, 4000);
    }
    )
  }

  odbijRezTure(idRez, index){
    this.servis.odbijRezTura(idRez).subscribe((res:any)=>{
      console.log(res);
      this.message = res.message;
      this.showAlertErr[index] = false;
      this.showAlertOK[index] = true;
      window.setTimeout(()=>{
        this.showAlertOK[index] = false;
      }, 4000);
    },
    (error)=>{
      console.log('usla u error')
      this.showAlertOK[index] = false;
      this.showAlertErr[index] = true;
      this.handleTheError(error);
      window.setTimeout(()=>{
        this.showAlertErr[index] = false;
      }, 4000);
    }
    )
  }

  odbijRezSmestaja(idRez, index){
    this.servis.odbijRezSmestaj(idRez).subscribe((res:any)=>{
      console.log(res);
      this.message = res.message;
      this.showAlertErr[index] = false;
      this.showAlertOK[index] = true;
      window.setTimeout(()=>{
        this.showAlertOK[index] = false;
      }, 4000);
    },
    (error)=>{
      console.log('usla u error')
      this.showAlertOK[index] = false;
      this.showAlertErr[index] = true;
      window.setTimeout(()=>{
        this.showAlertErr[index] = false;
      }, 4000);
      this.handleTheError(error);
    }
    )
  }

}
