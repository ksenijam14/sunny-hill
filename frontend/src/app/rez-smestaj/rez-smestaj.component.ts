import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { KlijentService } from '../servisi/klijent.service';

@Component({
  selector: 'app-rez-smestaj',
  templateUrl: './rez-smestaj.component.html',
  styleUrls: ['./rez-smestaj.component.css']
})
export class RezSmestajComponent implements OnInit {

  constructor(private servis: KlijentService, private ruter:Router, private route: ActivatedRoute) {
    this.minDate = new Date(2022,8,15); //promeni na danasnji datum
   }
  
  ulogovan: Korisnik;
  idHotela: String;
  detaljiS: Korisnik;
  zauzetiDatumi: String[];

  forma: FormGroup;

  imageObject: Array<object>;

  showRezForma: Boolean = false;
  minDate: Date;
  message: string;
  showAlertErr: boolean = false;
  showAlertOK: boolean = false;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    this.imageObject = [];
    console.log("ulogovan",this.ulogovan);
    this.forma = new FormGroup({
      tip_sobe: new FormControl('', [Validators.required]),
      br_osoba: new FormControl('', [Validators.required]),
      br_tel: new FormControl('', [Validators.required]),
      datum_OD: new FormControl('', [Validators.required]),
      datum_DO: new FormControl('', [Validators.required]),
      dodatne_info: new FormControl(''),
      status: new FormControl('nova'),
      klijent: new FormControl(this.ulogovan.kor_ime),
      email: new FormControl(this.ulogovan.email)
    });

    this.route.queryParams
      .subscribe(params => {
        if(params['idHotela']){
          console.log("parametar", params['idHotela']);
          this.idHotela = params['idHotela'];
          this.servis.detaljiSmestaja(this.idHotela).subscribe((res:Korisnik)=>{
            this.detaljiS= res;
            console.log("detalji hotela", this.detaljiS[0]);
            this.detaljiS[0].detalji_hotela[0]['slike'].forEach(slika => {
              let path = slika;
              this.imageObject.push({image:`http://localhost:4000/firma/${path}`})
            })

            console.log("image object", this.imageObject);
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

  clicked: Boolean = false;
  showForma(){
    this.clicked = true;
    this.showRezForma = true;
  }

  zauzetoDatumi: number[];

  getFreeDates(event: any){
    //alert(event.value);
    let tip;
    if(event.value == "sa pogledom na prirodu"){
      tip = "sa_pogledom"
    }else{
      tip = event.value;
    }
    console.log("tip sobe", tip);
    let first;
    let preklapajuciDatumi;
    preklapajuciDatumi = [];
    this.zauzetoDatumi = [];
    if(this.detaljiS[0].detalji_hotela[0]['rezervacije'].length > 0){
      for(let i = 0; i < this.detaljiS[0].detalji_hotela[0]['rezervacije'].length; i++){
        if(this.detaljiS[0].detalji_hotela[0]['rezervacije'][i]['tip_sobe'] == tip){
          first = this.detaljiS[0].detalji_hotela[0]['rezervacije'][i];
          break;
        }
      }
      console.log(first?.datum_OD);
      // let dateP = Date.parse(first.datum_OD);
      // console.log(dateP);
      let cnt = 0;
      if(first!=null || first!=undefined){
        this.detaljiS[0].detalji_hotela[0]['rezervacije'].forEach(rez => {
          // console.log("od", Date.parse(rez.datum_OD) >= Date.parse(first.datum_OD))
          // console.log("do", Date.parse(rez.datum_DO) <= Date.parse(first.datum_DO))
          if(rez?.tip_sobe == first?.tip_sobe){
            if (Date.parse(rez?.datum_OD) >= Date.parse(first?.datum_OD)){
              if(Date.parse(rez?.datum_DO) <= Date.parse(first?.datum_DO)){
                cnt++;
                preklapajuciDatumi.push(rez?.datum_OD);
                preklapajuciDatumi.push(rez?.datum_DO);
              }
            }
          }
        })

        this.detaljiS[0].detalji_hotela[0]['sobe'].forEach(soba => {
          if((tip == soba.tipS) && (soba.br_soba == cnt)){
            for(let i=0; i<preklapajuciDatumi.length; i++){
              let dat = new Date(preklapajuciDatumi[i])
              this.zauzetoDatumi.push(dat.getTime());
            }
          }
        });
      }
      console.log('cnt', cnt)
      console.log('datumi', preklapajuciDatumi)
      console.log('zauzeto datumi', this.zauzetoDatumi);
    }
  }

  myFilter = (d: Date): boolean => {
    const time=d.getTime()
    return !this.zauzetoDatumi.find(x=>x==time)
  }

  handleTheError(error: HttpErrorResponse){
    console.log("usla u handler")
    this.message = error.error.message;
  }

  rezervacija(){
    let broj = (((this.forma.value.datum_DO - this.forma.value.datum_OD)/(1000*3600*24)) + 1);
    console.log('br-dana', broj);
    console.log('rez', this.forma.value);
    this.servis.rezSmestaj(this.forma.value, this.idHotela).subscribe((res:any)=>{
      console.log(res);
      this.message = res.message;
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

}
