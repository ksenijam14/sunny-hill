import { Component, OnInit } from '@angular/core';
import { DetaljiFirme } from '../models/detaljiFirme';
import { FirmaServisService } from '../servisi/firma-servis.service';

@Component({
  selector: 'app-admin-pregled',
  templateUrl: './admin-pregled.component.html',
  styleUrls: ['./admin-pregled.component.css']
})
export class AdminPregledComponent implements OnInit {

  constructor(private servisF: FirmaServisService) { }

  sviDetalji: DetaljiFirme[];
  showKomentar: boolean[];
  
  ngOnInit(): void {
    this.showKomentar = []
    this.servisF.getAllDetaljiFirme().subscribe((res: any)=>{
      this.sviDetalji = res;
      console.log(this.sviDetalji);
      this.sviDetalji.forEach(det => {
        this.showKomentar.push(false);
      });
    })
  }

  see_comm(index){
    // alert(index);
    if(this.showKomentar[index] == true){
      this.showKomentar[index] = false;
    }else{
      this.showKomentar[index] = true;
    }
   
  }

}
