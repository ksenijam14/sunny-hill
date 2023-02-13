import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-meni-firme',
  templateUrl: './meni-firme.component.html',
  styleUrls: ['./meni-firme.component.css']
})
export class MeniFirmeComponent implements OnInit {

  constructor(private ruter:Router) { }
  
  ulogovan:Korisnik;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

  home(){
    if(this.ulogovan.tip=='planinari'){
      this.ruter.navigate(['/firme/planinari']);
    }else if(this.ulogovan.tip=='ski_skola'){
      this.ruter.navigate(['firme/ski_skola']);
    }else{
      this.ruter.navigate(['firme/smestaj']);
    }
  }

  nova_tura(){
    if(this.ulogovan.tip=='planinari'){
      this.ruter.navigate(['/firme/planinari/nova_tura']);
    }
  }

  pregled_tura(){
    if(this.ulogovan.tip=='planinari'){
      this.ruter.navigate(['/firme/planinari/pregled_tura']);
    }
  }

  nove_rez(){
    if(this.ulogovan.tip=='planinari'){
      this.ruter.navigate(['/firme/planinari/nove_rezervacije']);
    }else if(this.ulogovan.tip=='ski_skola'){
      this.ruter.navigate(['firme/ski_skola/nove_rezervacije']);
    }else{
      this.ruter.navigate(['firme/smestaj/nove_rezervacije']);
    }
  }

  odobrene_rez(){
    if(this.ulogovan.tip=='planinari'){
      this.ruter.navigate(['/firme/planinari/odobrene_rezervacije']);
    }else if(this.ulogovan.tip=='ski_skola'){
      this.ruter.navigate(['firme/ski_skola/odobrene_rezervacije']);
    }else{
      this.ruter.navigate(['firme/smestaj/odobrene_rezervacije']);
    }
  }

  odbijene_rez(){
    if(this.ulogovan.tip=='planinari'){
      this.ruter.navigate(['/firme/planinari/odbijene_rezervacije']);
    }else if(this.ulogovan.tip=='ski_skola'){
      this.ruter.navigate(['firme/ski_skola/odbijene_rezervacije']);
    }else{
      this.ruter.navigate(['firme/smestaj/odbijene_rezervacije']);
    }
  }

  changePass(){
    this.ruter.navigate(['/promena-lozinke']);
  }

}
