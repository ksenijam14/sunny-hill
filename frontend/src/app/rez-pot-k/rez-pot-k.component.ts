import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DetaljiFirme } from '../models/detaljiFirme';
import { Korisnik } from '../models/korisnik';
import { PlaninskaTura } from '../models/planinskaTura';
import { RezSki } from '../models/rezSki';
import { RezTura } from '../models/rezTura';
import { FirmaServisService } from '../servisi/firma-servis.service';
import { KlijentService } from '../servisi/klijent.service';

@Component({
  selector: 'app-rez-pot-k',
  templateUrl: './rez-pot-k.component.html',
  styleUrls: ['./rez-pot-k.component.css']
})
export class RezPotKComponent implements OnInit {

  constructor(private servis: KlijentService, private servisF: FirmaServisService, private ruter:Router) { 
    this.indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ulogovan: Korisnik;
  allUsers: Korisnik[];
  allDetails: DetaljiFirme[];
  allPlanTure: PlaninskaTura[];

  helloAlert: boolean = true;
  helloSM: boolean = false;

  showComment: boolean = true;
  forma: FormGroup;

  rezSm: DetaljiFirme[]; //jer ce nam vratiti ceo objekat kad pronadje poklapanje
  mojSmestaj: any[];
  mojSmestajAllData: any[];
  

  rezTura: RezTura[];
  mojeTure: any[];

  rezSki: RezSki[];
  mojSki: any[];

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    this.mojSmestaj = [];
    this.mojeTure = [];
    this.mojSki = [];
    window.setTimeout(()=>{
      this.helloAlert = false;
      this.helloSM = true;
    }, 8000);

    this.forma = new FormGroup({
      text: new FormControl('', [Validators.required]),
      ocena: new FormControl('', [Validators.required])
    });

    this.servisF.getAllUsers().subscribe((res:Korisnik[])=>{
      this.allUsers = res;
      this.servisF.getAllDetaljiFirme().subscribe((res2:DetaljiFirme[])=>{
        this.allDetails = res2;
        this.servis.searchRezSmByKor(this.ulogovan.kor_ime).subscribe((resD:DetaljiFirme[])=>{
          this.rezSm = resD;
          console.log("smestaj", this.rezSm);
          this.rezSm.forEach(smestajD => {
            smestajD.rezervacije.forEach(rez => {
              if(rez['klijent'] == this.ulogovan.kor_ime){
                this.allUsers.forEach(user => { //trazim adresu, planinu i drzavu tog smestaja
                  if(user.kor_ime == smestajD.kor_ime){
                    this.mojSmestaj.push({nazivP: smestajD.nazivP, idF: smestajD.idF, 
                      adresaP: user.adresaP, planina: user.planina, drzava: user.drzava,
                      kategorija: smestajD.kategorija, rezervacije: rez
                    });
                  }
                });
              }
            });
          });
          console.log("moje rez smestaja", this.mojSmestaj);

          //  SKI SKOLE //
          this.servis.searchRezSkiByKor(this.ulogovan.kor_ime).subscribe((resSki:RezSki[])=>{
            this.rezSki = resSki;
            this.rezSki.forEach(ski => {
              ski.rezervacije.forEach(rez => {
                if(rez['klijent'] == this.ulogovan.kor_ime){
                  this.allUsers.forEach(user => {
                    if(user._id == ski.idSkole){
                      this.allDetails.forEach(det => {
                        if(det.idF == ski.idSkole){
                          det.instruktori.forEach(instr => {
                            if(instr['_id'] == ski.id_instruktora){
                              this.mojSki.push({idF:det.idF,nazivP: user.nazivP, adresaP: user.adresaP, planina: user.planina,
                                drzava: user.drzava, instruktor: instr['ime_prezime'], cena_casa: det.cena_casa,
                                cena_opreme: det.cena_opreme, rezervacija: rez
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            });
            console.log("moje ski rez", this.mojSki);

            // PLANINARI //
            this.servis.searchRezPlanByKor(this.ulogovan.kor_ime).subscribe((resTura:RezTura[])=>{
              this.rezTura = resTura;
              console.log("rez ture", this.rezTura);
              //this.servisF.getAllDetaljiFirme().subscribe((res2:DetaljiFirme[])=>{
                //this.allDetails = res2;
                this.servisF.getAllPlanTure().subscribe((res3:PlaninskaTura[])=>{
                  this.allPlanTure = res3;
                  this.rezTura.forEach(tura => {
                    tura.rezervacije.forEach(rez => {
                      if(rez['klijent']==this.ulogovan.kor_ime){
                        this.allUsers.forEach(user => {
                          if(user._id == tura.idPlan){
                            this.allDetails.forEach(detalji => {
                              if(detalji.idF == tura.idPlan){
                                this.allPlanTure.forEach(detTura => {
                                  if(detTura._id == tura.idTure){
                                    this.mojeTure.push({idPlan:tura.idPlan, nazivP:user.nazivP, adresaP:user.adresaP, drzava: user.drzava,
                                      idTure:tura.idTure, cena: detTura.cena, datum_OD: detTura.datum_OD, datum_DO: detTura.datum_DO,
                                      nazivTure: detTura.naslov, rezervacija: rez
                                    })
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  });
                  console.log("moje plan ture", this.mojeTure);
                })
              //})
            })
          })
        })
      })
    })
    
  }

  show_details(id_t){
    // alert(id_t);
    this.ruter.navigate(
      ['klijent/detalji-ture'],
      { queryParams: { idTure: id_t } }
    );
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.forma.controls[controlName].hasError(errorName);
  }

  indexes: number[];
  rating: number;

  rate(i) {
    this.rating = this.indexes[i-1];
    this.forma.value.ocena = this.rating;
  }

  detaljiOcena: DetaljiFirme;
  suma: number;
  prosecna: number;

  komentarisi(idFirme){
    // alert(idFirme);
    this.suma = 0;
    console.log("komentar forma", this.forma.value);
    this.servisF.addComment(this.forma.value, idFirme, this.ulogovan.ime_prezime).subscribe((res:any)=>{
      console.log(res);
      this.servisF.getDetaljiFirmeById(idFirme).subscribe((res:DetaljiFirme)=>{
        this.detaljiOcena = res;
        if(this.detaljiOcena.komentari.length > 0){
          this.detaljiOcena.komentari.forEach(kom => {
            this.suma += kom['ocena'];
          });
        }
        this.prosecna = this.suma / this.detaljiOcena.komentari.length;
        console.log("prosecna ocena", this.prosecna.toFixed(2));
        if(this.detaljiOcena.komentari.length == 1){
          this.servisF.updateOcena(idFirme, this.prosecna).subscribe((resOcena:any)=>{
            console.log(resOcena);
  
            this.showComment = false;
          })
        }else{
          this.servisF.updateOcena(idFirme, this.prosecna.toFixed(2)).subscribe((resOcena:any)=>{
            console.log(resOcena);
  
            this.showComment = false;
          })
        }
        
      })
    })
  }
}
