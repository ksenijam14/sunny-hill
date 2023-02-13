import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetaljiFirme } from '../models/detaljiFirme';
import { Korisnik } from '../models/korisnik';
import { FirmaServisService } from '../servisi/firma-servis.service';

@Component({
  selector: 'app-planinari',
  templateUrl: './planinari.component.html',
  styleUrls: ['./planinari.component.css']
})
export class PlaninariComponent implements OnInit {

  constructor(private servis: FirmaServisService, private ruter:Router) { }
  
  ulogovan: Korisnik; //planinarsko drustvo
  detalji: DetaljiFirme;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("Ulogovan planinar", this.ulogovan);
    this.ulogovan.tip = "Planinarsko drustvo";

    this.servis.getDetaljiFirme(this.ulogovan.kor_ime).subscribe((det:DetaljiFirme)=>{
      this.detalji = det;
      console.log("detalji planinari", this.detalji);
    })
    
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

}
