import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogNotifyComponent } from '../dialog-notify/dialog-notify.component';
import { DetaljiFirme } from '../models/detaljiFirme';
import { Korisnik } from '../models/korisnik';
import { PlaninskaTura } from '../models/planinskaTura';
import { FirmaServisService } from '../servisi/firma-servis.service';
import { KlijentService } from '../servisi/klijent.service';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private ruter:Router, private route: ActivatedRoute, private servisK: KlijentService, private servis: FirmaServisService,
    public dialog: MatDialog
    ) { }

  sveSkole: Korisnik[];
  skPlan: Korisnik[];
  mojeSkole: any[];
  izabranaPlanina: string;

  sviSmestaji: Korisnik[];
  smPlan: Korisnik[];
  mojSmestaj: any[];
  tipSmestaja: string;
  izabranaDrzava: string;

  sveTure: Korisnik[];
  sveFirmeDet: DetaljiFirme[];
  turePlan: Korisnik[];
  mojeTure: any[];
  datum_od: Date;
  datum_do: Date;
  
  tip_odmora: string;

  ulogovan:Korisnik;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    this.skPlan = [];
    this.mojeSkole = [];
    this.mojSmestaj = [];
    this.smPlan = [];
    this.turePlan = [];
    this.mojeTure = [];
    this.route.queryParams
      .subscribe(params => {
        if(params){
          console.log(params);
          if(params['tip_odmora'] == 'ski_skola'){
            this.tip_odmora = params['tip_odmora'];
            this.servisK.dohvSveSkiSkole().subscribe((resSki:Korisnik[])=>{
              this.sveSkole = resSki;
              console.log("sve skole", this.sveSkole);
              this.servisK.dohvSveSmestaje().subscribe((resSM:Korisnik[])=>{
                this.sviSmestaji = resSM;
                console.log("svi smestaji", this.sviSmestaji);
                if((params['planina'] != "" && params['tip_smestaja'] == "" && params['datum_od'] == "" && params['datum_do'] == "") ||
                (params['planina'] != "" && params['tip_smestaja'] == "" && params['datum_od'] != "" && params['datum_do'] != "")
                ){
                  this.izabranaPlanina = params['planina']
                  this.sveSkole.forEach(skola => {
                    if(this.izabranaPlanina.toLowerCase() == skola.planina){
                      this.skPlan.push(skola);
                    }
                  });
                  this.skPlan.forEach(skola => {
                    this.mojeSkole.push({ocena: skola.detalji_skole[0]['ocena'], skola: skola});
                  });
                  this.mojeSkole.sort((a, b)=> { //opadajuce prema oceni
                    if (a['ocena'] < b['ocena']){
                      return 1;
                    }
                    if (a['ocena'] > b['ocena']){
                      return -1;
                    }
                    return 0;
                  })
                  //smestaj
                  this.sviSmestaji.forEach(smestaj => {
                    if(this.izabranaPlanina.toLowerCase() == smestaj.planina){
                      this.smPlan.push(smestaj);
                    }
                  });
                  this.smPlan.forEach(smestaj => {
                    this.mojSmestaj.push({ocena: smestaj.detalji_hotela[0]['ocena'], smestaj:smestaj});
                  });

                  this.mojSmestaj.sort((a, b)=> { //opadajuce prema oceni
                    if (a['ocena'] < b['ocena']){
                      return 1;
                    }
                    if (a['ocena'] > b['ocena']){
                      return -1;
                    }
                    return 0;
                  })

                  console.log("moj smestaj", this.mojSmestaj);
                  console.log("moje ski skole", this.mojeSkole);

                } else if ((params['planina'] != "" && params['tip_smestaja'] != "" && params['datum_od'] == "" && params['datum_do'] == "") ||
                ((params['planina'] != "" && params['tip_smestaja'] != "" && params['datum_od'] != "" && params['datum_do'] != ""))
                ){
                  //skijanje na odredjenoj planini i da smestaj bude odredjenog tipa
                  this.izabranaPlanina = params['planina']
                  this.tipSmestaja = params['tip_smestaja'];
                  this.sveSkole.forEach(skola => {
                    if(this.izabranaPlanina.toLowerCase() == skola.planina){
                      this.skPlan.push(skola);
                    }
                  });
                  this.skPlan.forEach(skola => {
                    this.mojeSkole.push({ocena: skola.detalji_skole[0]['ocena'], skola: skola});
                  });
                  this.mojeSkole.sort((a, b)=> { //opadajuce prema oceni
                    if (a['ocena'] < b['ocena']){
                      return 1;
                    }
                    if (a['ocena'] > b['ocena']){
                      return -1;
                    }
                    return 0;
                  })
                  //smestaj
                  this.sviSmestaji.forEach(smestaj => {
                    if(this.izabranaPlanina.toLowerCase() == smestaj.planina && this.tipSmestaja.toLowerCase() == smestaj.tip){
                      this.smPlan.push(smestaj);
                    }
                  });
                  this.smPlan.forEach(smestaj => {
                    this.mojSmestaj.push({ocena: smestaj.detalji_hotela[0]['ocena'], smestaj: smestaj});
                  });

                  this.mojSmestaj.sort((a, b)=> { //opadajuce prema oceni
                    if (a['ocena'] < b['ocena']){
                      return 1;
                    }
                    if (a['ocena'] > b['ocena']){
                      return -1;
                    }
                    return 0;
                  })

                  console.log("moj smestaj", this.mojSmestaj);
                  console.log("moje ski skole", this.mojeSkole);

                }else if ((params['drzava'] == "" && params['planina'] == "" && params['tip_smestaja'] != "" && params['datum_od'] == "" && params['datum_do'] == "") ||
                ((params['drzava'] == "" && params['planina'] != "" && params['tip_smestaja'] != "" && params['datum_od'] != "" && params['datum_do'] != ""))
                ){
                  //nema planine, ali ima tip smestaja
                  this.tipSmestaja = params['tip_smestaja'];
                  this.sveSkole.forEach(skola => {
                    this.skPlan.push(skola);
                    
                  });
                  this.skPlan.forEach(skola => {
                    this.mojeSkole.push({ocena: skola.detalji_skole[0]['ocena'], skola: skola});
                  });
                  this.mojeSkole.sort((a, b)=> { //opadajuce prema oceni
                    if (a['ocena'] < b['ocena']){
                      return 1;
                    }
                    if (a['ocena'] > b['ocena']){
                      return -1;
                    }
                    return 0;
                  })
                  //smestaj
                  this.sviSmestaji.forEach(smestaj => {
                    if(this.tipSmestaja.toLowerCase() == smestaj.tip){
                      this.smPlan.push(smestaj);
                    }
                  });
                  this.smPlan.forEach(smestaj => {
                    this.mojSmestaj.push({ocena: smestaj.detalji_hotela[0]['ocena'], smestaj: smestaj});
                  });

                  this.mojSmestaj.sort((a, b)=> { //opadajuce prema oceni
                    if (a['ocena'] < b['ocena']){
                      return 1;
                    }
                    if (a['ocena'] > b['ocena']){
                      return -1;
                    }
                    return 0;
                  })

                  console.log("moj smestaj", this.mojSmestaj);
                  console.log("moje ski skole", this.mojeSkole);
                }else if ((params['drzava'] != "" && params['planina'] == "" && params['tip_smestaja'] != "" && params['datum_od'] == "" && params['datum_do'] == "") ||
                ((params['drzava'] != "" && params['planina'] != "" && params['tip_smestaja'] != "" && params['datum_od'] != "" && params['datum_do'] != ""))
                ){
                  //ima drzava, nema planina i ima tip smestaja
                  this.izabranaDrzava = params['drzava'];
                  this.tipSmestaja = params['tip_smestaja'];
                  this.sveSkole.forEach(skola => {
                    if(this.izabranaDrzava.toLowerCase() == skola.drzava){
                      this.skPlan.push(skola);
                    }
                    
                  });
                  this.skPlan.forEach(skola => {
                    this.mojeSkole.push({ocena: skola.detalji_skole[0]['ocena'], skola: skola});
                  });
                  this.mojeSkole.sort((a, b)=> { //opadajuce prema oceni
                    if (a['ocena'] < b['ocena']){
                      return 1;
                    }
                    if (a['ocena'] > b['ocena']){
                      return -1;
                    }
                    return 0;
                  })
                  //smestaj
                  this.sviSmestaji.forEach(smestaj => {
                    if(this.tipSmestaja.toLowerCase() == smestaj.tip && this.izabranaDrzava.toLowerCase() == smestaj.drzava){
                      this.smPlan.push(smestaj);
                    }
                  });
                  this.smPlan.forEach(smestaj => {
                    this.mojSmestaj.push({ocena: smestaj.detalji_hotela[0]['ocena'], smestaj: smestaj});
                  });

                  this.mojeSkole.sort((a, b)=> { //opadajuce prema oceni
                    if (a['ocena'] < b['ocena']){
                      return 1;
                    }
                    if (a['ocena'] > b['ocena']){
                      return -1;
                    }
                    return 0;
                  })

                  console.log("moj smestaj", this.mojSmestaj);
                  console.log("moje ski skole", this.mojeSkole);
                }
                
              })
              })

          } else if(params['tip_odmora'] == 'planinari'){
            //sve planinarske ture mi trebaju, pa imam filter po planini ili celoj drzavi i datumima
            //tip smestaja nema uticaj
            this.tip_odmora = params['tip_odmora'];
            this.servisK.dohvSvePlaninareIdetalje().subscribe((resPlan:Korisnik[])=>{
              this.sveTure = resPlan;
              console.log("sve ture", this.sveTure);

              if(params['planina']!="" && params['datum_od']=="" && params['datum_do']==""){
                //imam samo planinu kao odrednicu
                this.izabranaPlanina = params['planina'];
                this.sveTure.forEach(tura => {
                  if(tura.detalji_tura['lokacija'] == this.izabranaPlanina.toLowerCase()){
                    this.turePlan.push(tura);
                  }
                });
                this.turePlan.forEach(tura => {
                  this.mojeTure.push({ocena: tura.detaljiFirme[0].ocena, tura: tura});
                });

                this.mojeTure.sort((a, b)=> { //opadajuce prema oceni
                  if (a['ocena'] < b['ocena']){
                    return 1;
                  }
                  if (a['ocena'] > b['ocena']){
                    return -1;
                  }
                  return 0;
                })

                console.log("moje ture", this.mojeTure);
                this.mojeTure.forEach(element => {
                  console.log(element.tura.detalji_tura);
                });

              }else if (params['planina']!="" && params['datum_od']!="" && params['datum_do']!=""){
                //imamo planinu i datume
                this.izabranaPlanina = params['planina'];
                let dat = new Date(params['datum_od'])
                this.datum_od = new Date(params['datum_od'])
                this.datum_do = new Date(params['datum_do'])

                this.sveTure.forEach(tura => {
                  if(tura.detalji_tura['lokacija'] == this.izabranaPlanina.toLowerCase()){
                    let datOD = new Date(tura.detalji_tura['datum_OD'])
                    let datDO = new Date(tura.detalji_tura['datum_DO'])
                    if (datOD.getTime()>=this.datum_od.getTime() && datDO.getTime()<=this.datum_do.getTime()){
                      this.turePlan.push(tura);
                    }
                  }
                });
                this.turePlan.forEach(tura => {
                  this.mojeTure.push({ocena: tura.detaljiFirme[0].ocena, tura: tura});
                });

                this.mojeTure.sort((a, b)=> { //opadajuce prema oceni
                  if (a['ocena'] < b['ocena']){
                    return 1;
                  }
                  if (a['ocena'] > b['ocena']){
                    return -1;
                  }
                  return 0;
                })

                console.log("moje ture", this.mojeTure);
              }else if (params['drzava']!="", params['planina']=="" && params['datum_od']=="" && params['datum_do']==""){
                //imam drzavu, nemam planinu i datume
                this.izabranaDrzava = params['drzava'];
                console.log(this.izabranaDrzava.toString().toLowerCase());
                this.sveTure.forEach(tura => {
                  if(tura.drzava == this.izabranaDrzava.toString().toLowerCase()){
                    this.turePlan.push(tura);
                  }
                });
                this.turePlan.forEach(tura => {
                  this.mojeTure.push({ocena: tura.detaljiFirme[0].ocena, tura: tura});
                });

                this.mojeTure.sort((a, b)=> { //opadajuce prema oceni
                  if (a['ocena'] < b['ocena']){
                    return 1;
                  }
                  if (a['ocena'] > b['ocena']){
                    return -1;
                  }
                  return 0;
                })

                console.log("moje ture", this.mojeTure);


              }else if(params['drzava']!="", params['planina']=="" && params['datum_od'] !="" && params['datum_do'] !=""){
                //imam drzavu i datume, nemam planinu
                this.izabranaDrzava = params['drzava'];
                this.datum_od = new Date(params['datum_od'])
                this.datum_do = new Date(params['datum_do'])

                this.sveTure.forEach(tura => {
                  if(tura.drzava == this.izabranaDrzava.toString().toLowerCase()){
                    let datOD = new Date(tura.detalji_tura['datum_OD'])
                    let datDO = new Date(tura.detalji_tura['datum_DO'])
                    if (datOD.getTime()>=this.datum_od.getTime() && datDO.getTime()<=this.datum_do.getTime()){
                      this.turePlan.push(tura);
                    }
                  }
                });
                this.turePlan.forEach(tura => {
                  this.mojeTure.push({ocena: tura.detaljiFirme[0].ocena, tura: tura});
                });

                this.mojeTure.sort((a, b)=> { //opadajuce prema oceni
                  if (a['ocena'] < b['ocena']){
                    return 1;
                  }
                  if (a['ocena'] > b['ocena']){
                    return -1;
                  }
                  return 0;
                })

                console.log("moje ture", this.mojeTure);
              }
            })
          }else if(params['tip_odmora'] == 'relax'){
            this.tip_odmora = params['tip_odmora'];
            this.servisK.dohvSveSmestaje().subscribe((resSM:Korisnik[])=>{
              this.sviSmestaji = resSM;
              console.log("svi smestaji relax", this.sviSmestaji);

              if((params['planina'] != "" && params['tip_smestaja'] == "" && params['datum_od'] == "" && params['datum_do'] == "") ||
              (params['planina'] != "" && params['tip_smestaja'] == "" && params['datum_od'] != "" && params['datum_do'] != "")
              ){
                //imamo samo planinu
                this.izabranaPlanina = params['planina'];
                this.sviSmestaji.forEach(smestaj => {
                  if(this.izabranaPlanina.toLowerCase() == smestaj.planina && smestaj.detalji_hotela[0].relax == true){
                    this.smPlan.push(smestaj);
                  }
                });
                this.smPlan.forEach(smestaj => {
                  this.mojSmestaj.push({ocena: smestaj.detalji_hotela[0]['ocena'], smestaj: smestaj});
                });
    
                this.mojSmestaj.sort((a, b)=> { //opadajuce prema oceni
                  if (a['ocena'] < b['ocena']){
                    return 1;
                  }
                  if (a['ocena'] > b['ocena']){
                    return -1;
                  }
                  return 0;
                })
    
                console.log("moj smestaj", this.mojSmestaj);

              }else if((params['planina'] != "" && params['tip_smestaja'] != "" && params['datum_od'] == "" && params['datum_do'] == "") ||
              (params['planina'] != "" && params['tip_smestaja'] != "" && params['datum_od'] != "" && params['datum_do'] != ""))
              {
                this.tipSmestaja = params['tip_smestaja'];
                this.izabranaPlanina = params['planina'];

                this.sviSmestaji.forEach(smestaj => {
                  if(this.izabranaPlanina.toLowerCase() == smestaj.planina && this.tipSmestaja.toLowerCase() == smestaj.tip && smestaj.detalji_hotela[0].relax == true){
                    this.smPlan.push(smestaj);
                  }
                });
                this.smPlan.forEach(smestaj => {
                  this.mojSmestaj.push({ocena: smestaj.detalji_hotela[0]['ocena'], smestaj: smestaj});
                });

                this.mojeSkole.sort((a, b)=> { //opadajuce prema oceni
                  if (a['ocena'] < b['ocena']){
                    return 1;
                  }
                  if (a['ocena'] > b['ocena']){
                    return -1;
                  }
                  return 0;
                })

                console.log("moj smestaj", this.mojSmestaj);

              }else if ((params['drzava'] == "" && params['planina'] == "" && params['tip_smestaja'] != "" && params['datum_od'] == "" && params['datum_do'] == "") ||
              ((params['drzava'] == "" && params['planina'] != "" && params['tip_smestaja'] != "" && params['datum_od'] != "" && params['datum_do'] != ""))
              ){
                //smestaj
                this.tipSmestaja = params['tip_smestaja'];

                this.sviSmestaji.forEach(smestaj => {
                  if(this.tipSmestaja.toLowerCase() == smestaj.tip && smestaj.detalji_hotela[0].relax == true){
                    this.smPlan.push(smestaj);
                  }
                });
                this.smPlan.forEach(smestaj => {
                  this.mojSmestaj.push({ocena: smestaj.detalji_hotela[0]['ocena'], smestaj: smestaj});
                });

                this.mojSmestaj.sort((a, b)=> { //opadajuce prema oceni
                  if (a['ocena'] < b['ocena']){
                    return 1;
                  }
                  if (a['ocena'] > b['ocena']){
                    return -1;
                  }
                  return 0;
                })

                console.log("moj smestaj", this.mojSmestaj);

              }else if ((params['drzava'] != "" && params['planina'] == "" && params['tip_smestaja'] != "" && params['datum_od'] == "" && params['datum_do'] == "") ||
              ((params['drzava'] != "" && params['planina'] != "" && params['tip_smestaja'] != "" && params['datum_od'] != "" && params['datum_do'] != ""))
              ){
                //ima drzava, nema planina i ima tip smestaja
                this.izabranaDrzava = params['drzava'];
                this.tipSmestaja = params['tip_smestaja'];
                //smestaj
                this.sviSmestaji.forEach(smestaj => {
                  if(this.tipSmestaja.toLowerCase() == smestaj.tip && this.izabranaDrzava.toLowerCase() == smestaj.drzava && smestaj.detalji_hotela[0].relax == true){
                    this.smPlan.push(smestaj);
                  }
                });
                this.smPlan.forEach(smestaj => {
                  this.mojSmestaj.push({ocena: smestaj.detalji_hotela[0]['ocena'], smestaj: smestaj});
                });

                this.mojeSkole.sort((a, b)=> { //opadajuce prema oceni
                  if (a['ocena'] < b['ocena']){
                    return 1;
                  }
                  if (a['ocena'] > b['ocena']){
                    return -1;
                  }
                  return 0;
                })

                console.log("moj smestaj", this.mojSmestaj);
              }
            })

            
          }
        }else{
          console.log("nema parametra query-a")
        }
      }
    );
  }

  rezervacija(idSkole){
    // alert(idSkole);
    if(this.ulogovan != null){
      this.ruter.navigate(
        ['/ski_skole/rez_ski'],
        { queryParams: { idSkole: idSkole } }
      );
    }else{
      const dialogRef = this.dialog.open(DialogNotifyComponent, {
        width: '500px',
      });
    }
  }

  vidiDetalje(idHotela){
    if(this.ulogovan != null){
      this.ruter.navigate(
        ['/smestaj/rez_smestaj'],
        { queryParams: { idHotela: idHotela } }
      );
    }else{
      const dialogRef = this.dialog.open(DialogNotifyComponent, {
        width: '500px',
      });
    }
  }

  counter(i: number) {
    return new Array(i);
  } 

  detalji(idTure){
    //alert(idTure);
    if(this.ulogovan != null){
      this.ruter.navigate(
        ['/planinarske_ture/rez_ture'],
        { queryParams: { idTure: idTure } }
      );
    }else{
      const dialogRef = this.dialog.open(DialogNotifyComponent, {
        width: '500px',
      });
    }
  }

}
