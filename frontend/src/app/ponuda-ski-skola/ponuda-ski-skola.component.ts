import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogNotifyComponent } from '../dialog-notify/dialog-notify.component';
import { DetaljiFirme } from '../models/detaljiFirme';
import { Korisnik } from '../models/korisnik';
import { KlijentService } from '../servisi/klijent.service';

@Component({
  selector: 'app-ponuda-ski-skola',
  templateUrl: './ponuda-ski-skola.component.html',
  styleUrls: ['./ponuda-ski-skola.component.css']
})
export class PonudaSkiSkolaComponent implements OnInit {

  constructor(private servis: KlijentService, private ruter:Router, public dialog: MatDialog) { }

  ulogovan:Korisnik;
  skole: Korisnik[];


  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("ulogovan",this.ulogovan);
    this.servis.dohvSveSkiSkole().subscribe((res:Korisnik[])=>{
      this.skole = res;
      console.log("skole", this.skole);
      console.log("cena casa", res);
      this.skole.sort((a, b)=> {
        if (a['detalji_skole'][0]['ocena'] < b['detalji_skole'][0]['ocena']){
          return 1;
        }
        if (a['detalji_skole'][0]['ocena'] > b['detalji_skole'][0]['ocena']){
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

  onScrollDown(event){ //za lepsi scroll kartica, infinity scroll

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

}
