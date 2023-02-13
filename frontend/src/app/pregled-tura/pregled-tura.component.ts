import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { PlaninskaTura } from '../models/planinskaTura';
import { FirmaServisService } from '../servisi/firma-servis.service';

@Component({
  selector: 'app-pregled-tura',
  templateUrl: './pregled-tura.component.html',
  styleUrls: ['./pregled-tura.component.css']
})
export class PregledTuraComponent implements OnInit {

  constructor(private servis: FirmaServisService, private ruter:Router) { }
  ulogovan: Korisnik; //planinarsko drustvo
  sveTure: PlaninskaTura[];

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    this.servis.dohvatiSveTure(this.ulogovan._id).subscribe((res:PlaninskaTura[])=>{
      this.sveTure = res;
      console.log("sve ture", this.sveTure);
    })
  }

  onScrollDown(event){

  }

  show_details(id_t){
    alert(id_t);
    this.ruter.navigate(
      ['/firme/planinari/tura'],
      { queryParams: { idTure: id_t } }
    );
  }

}
