import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-meni-klijent',
  templateUrl: './meni-klijent.component.html',
  styleUrls: ['./meni-klijent.component.css']
})
export class MeniKlijentComponent implements OnInit {

  constructor(private ruter:Router) { }

  ulogovan:Korisnik;
  
  ngOnInit(): void {
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

  mojProfil(){
    this.ruter.navigate(['/klijent']);
  }

  poslate(){
    this.ruter.navigate(['/klijent/poslate_rez']);
  }

  potvrdjene(){
    this.ruter.navigate(['/klijent/potvrdjene_rez']);
  }

  changePass(){
    this.ruter.navigate(['/promena-lozinke']);
  }

}
