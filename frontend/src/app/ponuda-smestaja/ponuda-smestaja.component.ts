import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogNotifyComponent } from '../dialog-notify/dialog-notify.component';
import { Korisnik } from '../models/korisnik';
import { KlijentService } from '../servisi/klijent.service';

@Component({
  selector: 'app-ponuda-smestaja',
  templateUrl: './ponuda-smestaja.component.html',
  styleUrls: ['./ponuda-smestaja.component.css']
})
export class PonudaSmestajaComponent implements OnInit {

  constructor(private servis: KlijentService, private ruter:Router, public dialog: MatDialog) { }


  ulogovan:Korisnik;
  smestaji: Korisnik[];

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("ulogovan",this.ulogovan);
    this.servis.dohvSveSmestaje().subscribe((res:Korisnik[])=>{
      this.smestaji = res;
      console.log("smestaji", this.smestaji);
      //sortira opadajuce po oceni korisnika
      this.smestaji.sort((a, b)=> {
        if (a['detalji_hotela'][0]['ocena'] < b['detalji_hotela'][0]['ocena']){
          return 1;
        }
        if (a['detalji_hotela'][0]['ocena'] > b['detalji_hotela'][0]['ocena']){
          return -1;
        }
        return 0;
      })
    })
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

  counter(i: number) {
    return new Array(i);
  } 

  onScrollDown(event){ //za lepsi scroll kartica, infinity scroll

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

}
