import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { PlaninskaTura } from '../models/planinskaTura';
import { FirmaServisService } from '../servisi/firma-servis.service';
import { KlijentService } from '../servisi/klijent.service';

@Component({
  selector: 'app-rez-tura',
  templateUrl: './rez-tura.component.html',
  styleUrls: ['./rez-tura.component.css']
})
export class RezTuraComponent implements OnInit {

  constructor(private servisKlijent: KlijentService, private servis: FirmaServisService, private ruter:Router, private route: ActivatedRoute) { }

  idTure: string;
  detaljiTure: PlaninskaTura;
  forma: FormGroup;
  ulogovan: Korisnik;

  message: string;
  showAlertErr: boolean = false;
  showAlertOK: boolean = false;

  imageObject: Array<object>;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    this.imageObject = [];
    console.log("ulogovan", this.ulogovan);
    this.forma = new FormGroup({
      br_mesta: new FormControl('', [Validators.required]),
      br_tel: new FormControl('', [Validators.required]),
      dodatni_info: new FormControl(''),
      status: new FormControl('nova'),
      klijent: new FormControl(this.ulogovan.kor_ime),
      email: new FormControl(this.ulogovan.email),
      idPlan: new FormControl('')
    })
    this.route.queryParams
      .subscribe(params => {
        if(params['idTure']){
          console.log("parametar", params['idTure']);
          this.idTure = params['idTure'];
          this.servis.detaljiTure(this.idTure).subscribe((detalji:PlaninskaTura)=>{
            console.log("res", detalji);
            this.detaljiTure = detalji;
            this.forma.value.idPlan = this.detaljiTure['idP']; 
            console.log("detalji", this.detaljiTure);
            this.detaljiTure['slike'].forEach(slika => {
              let path = slika;
              this.imageObject.push({image:`http://localhost:4000/planinari/${path}`})
            });
            console.log("image object", this.imageObject);
          })
        }else{
          console.log("nema parametra query-a")
        }
      }
    );
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.forma.controls[controlName].hasError(errorName);
  }

  handleTheError(error: HttpErrorResponse){
    console.log("usla u handler")
    this.message = error.error.message;
  }

  rezervacija(){
    console.log("forma", this.forma.value);
    this.forma.value.idPlan = this.detaljiTure['idP']
    console.log("rez idPlan", this.forma.value.idPlan);
    // const form = new FormData();

    // form.set('kor_ime', this.ulogovan.kor_ime);
    // form.set('email', this.ulogovan.email);
    // form.set('idTure', this.idTure);

    // form.set('br_mesta', this.forma.value.br_mesta);
    // form.set('br_tel', this.forma.value.br_tel);

    // if (this.forma.value.dodatno == "" || this.forma.value.dodatno == undefined){
    //   form.append('dodatno', null);
    // }else{
    //   form.set('dodatno', this.forma.value.dodatno);
    // }

    // form.forEach(el=>{
    //   console.log(el);
    // })
    
    // console.log("za slanje", form);

    this.servisKlijent.rezPlanTura(this.forma.value, this.idTure).subscribe((res:any)=>{
      console.log(res);
      this.message = "Uspešno poslata rezervacija!";
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
