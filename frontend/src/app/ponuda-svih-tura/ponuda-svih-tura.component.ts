import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogNotifyComponent } from '../dialog-notify/dialog-notify.component';
import { Korisnik } from '../models/korisnik';
import { PlaninskaTura } from '../models/planinskaTura';
import { KlijentService } from '../servisi/klijent.service';

@Component({
  selector: 'app-ponuda-svih-tura',
  templateUrl: './ponuda-svih-tura.component.html',
  styleUrls: ['./ponuda-svih-tura.component.css']
})
export class PonudaSvihTuraComponent implements OnInit {

  constructor(private servis: KlijentService, private ruter:Router, public dialog: MatDialog) { }

  ulogovan:Korisnik;
  planinari: Korisnik[];
  sveTure: PlaninskaTura[];
  formaSearch: FormGroup;
  sveLokacije: String[];

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("ulogovan",this.ulogovan);
    this.sveTure = [];
    this.sveLokacije = [];
    this.formaSearch = new FormGroup({
      planina: new FormControl('')
    })
    this.servis.dohvSvePlaninare().subscribe((res:Korisnik[])=>{
      this.planinari = res;
      console.log("planinari", this.planinari);
      this.planinari.forEach(element => {
        element.detalji_tura.forEach(tura => {
          this.sveTure.push(tura);
          this.sveLokacije.push(tura.lokacija);
        });
      });
      this.sveTure.sort((a, b)=> {
        if (a['datum_OD'] < b['datum_OD']){
          return -1;
        }
        if (a['datum_OD'] > b['datum_OD']){
          return 1;
        }
        return 0;
      })
      console.log("sve ture", this.sveTure);
    })
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

  onScrollDown(event){ //za lepsi scroll kartica, infinity scroll

  }

  dohvTurePoPlanini(event){
    //alert(event.value);
    this.sveTure = [];
    this.servis.dohvSvePlaninare().subscribe((res:Korisnik[])=>{
      this.planinari = res;
      console.log("planinari", this.planinari);
      this.planinari.forEach(element => {
        element.detalji_tura.forEach(tura => {
          if(event.value == "sve"){
            this.sveTure.push(tura);
          }else if(tura.lokacija == event.value){
            this.sveTure.push(tura);
          }     
        });
      });
      this.sveTure.sort((a, b)=> {
        if (a['datum_OD'] < b['datum_OD']){
          return -1;
        }
        if (a['datum_OD'] > b['datum_OD']){
          return 1;
        }
        return 0;
      })
      console.log("sve ture", this.sveTure);
    })
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
