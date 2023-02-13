import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetaljiFirme } from '../models/detaljiFirme';
import { Korisnik } from '../models/korisnik';
import { FirmaServisService } from '../servisi/firma-servis.service';

@Component({
  selector: 'app-smestaj',
  templateUrl: './smestaj.component.html',
  styleUrls: ['./smestaj.component.css']
})
export class SmestajComponent implements OnInit {

  constructor(private servis: FirmaServisService, private ruter:Router) { }

  ulogovan: Korisnik;
  detaljiSm: DetaljiFirme;

  editMode:boolean = false;
  popustNovi: number;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    this.servis.getDetaljiFirme(this.ulogovan.kor_ime).subscribe((res:DetaljiFirme)=>{
      this.detaljiSm = res;
      console.log("detalji", this.detaljiSm);
    })
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

  editPopust(){
    console.log('popust', this.popustNovi);
    this.servis.editPopust(this.ulogovan._id, this.popustNovi).subscribe((res:any)=>{
      console.log(res);
      this.servis.getDetaljiFirme(this.ulogovan.kor_ime).subscribe((res:DetaljiFirme)=>{
        this.detaljiSm = res;
        console.log("detalji", this.detaljiSm);
      })
    })
  }

}
