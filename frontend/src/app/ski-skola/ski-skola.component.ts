import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetaljiFirme } from '../models/detaljiFirme';
import { Korisnik } from '../models/korisnik';
import { FirmaServisService } from '../servisi/firma-servis.service';

@Component({
  selector: 'app-ski-skola',
  templateUrl: './ski-skola.component.html',
  styleUrls: ['./ski-skola.component.css']
})
export class SkiSkolaComponent implements OnInit {

  constructor(private servis: FirmaServisService, private ruter:Router) { }

  ulogovan: Korisnik;
  detaljiSk: DetaljiFirme;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    this.servis.getDetaljiFirme(this.ulogovan.kor_ime).subscribe((res:DetaljiFirme)=>{
      this.detaljiSk = res;
      console.log("detalji", this.detaljiSk);
    })
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

}
