import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor() { }

  ulogovan: Korisnik;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    
  }

  

}
