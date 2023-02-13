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
  selector: 'app-rez-posl-k',
  templateUrl: './rez-posl-k.component.html',
  styleUrls: ['./rez-posl-k.component.css']
})
export class RezPoslKComponent implements OnInit {

  constructor(private servis: KlijentService, private servisF: FirmaServisService, private ruter:Router) { }

  ulogovan: Korisnik;
  allUsers: Korisnik[];
  allDetails: DetaljiFirme[];
  allPlanTure: PlaninskaTura[];

  helloAlert: boolean = true;
  helloSM: boolean = false;

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
                              this.mojSki.push({nazivP: user.nazivP, adresaP: user.adresaP, planina: user.planina,
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
                                    this.mojeTure.push({nazivP:user.nazivP, adresaP:user.adresaP, drzava: user.drzava,
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

}
