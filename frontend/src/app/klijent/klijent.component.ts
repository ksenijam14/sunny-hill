import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit {

  constructor() { }

  ulogovan: Korisnik;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(this.ulogovan);
  }

}
