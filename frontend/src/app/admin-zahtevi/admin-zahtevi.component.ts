import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { AdminServisService } from '../servisi/admin-servis.service';


@Component({
  selector: 'app-admin-zahtevi',
  templateUrl: './admin-zahtevi.component.html',
  styleUrls: ['./admin-zahtevi.component.css']
})
export class AdminZahteviComponent implements OnInit {

  constructor(private servis:AdminServisService) { }
  svaPreduzeca: Korisnik[]=[];

  ngOnInit(): void {
    this.servis.getAllCompanies().subscribe((firme:Korisnik[])=>{
      this.svaPreduzeca = firme;
      console.log("preduzeca:", this.svaPreduzeca);
    })
  }

  aktiviraj(preduzece){
    console.log("usao za", preduzece);
    console.log("usao za", preduzece._id);
    this.servis.aktivirajNalog(preduzece._id).subscribe((res:any)=>{
      if(res['message']=='Aktiviran nalog'){
        this.servis.getAllCompanies().subscribe((firme:Korisnik[])=>{
          this.svaPreduzeca = firme;
          console.log("preduzeca:", this.svaPreduzeca);
          this.servis.sendEmail(preduzece.nazivP, preduzece.email, 'aktivirani ste').subscribe((resE:any)=>{
            console.log(resE);
          })
        })
      }
    })
  }

  deaktiviraj(preduzece){
    console.log("usao za", preduzece);
    console.log("usao za", preduzece._id);
    this.servis.deaktivirajNalog(preduzece._id).subscribe((res:any)=>{
      if(res['message']=='Deaktiviran nalog'){
        this.servis.getAllCompanies().subscribe((firme:Korisnik[])=>{
          this.svaPreduzeca = firme;
          console.log("preduzeca:", this.svaPreduzeca);
        })
      }
    })
  }

}
