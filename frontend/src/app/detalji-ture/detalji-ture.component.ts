import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaninskaTura } from '../models/planinskaTura';
import { FirmaServisService } from '../servisi/firma-servis.service';

@Component({
  selector: 'app-detalji-ture',
  templateUrl: './detalji-ture.component.html',
  styleUrls: ['./detalji-ture.component.css']
})
export class DetaljiTureComponent implements OnInit {

  constructor(private servis: FirmaServisService, private ruter:Router, private route: ActivatedRoute) { }
  
  idTure: String;
  detaljiTure: PlaninskaTura;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if(params['idTure']){
          console.log("parametar", params['idTure']);
          this.idTure = params['idTure'];
          this.servis.detaljiTure(this.idTure).subscribe((detalji:PlaninskaTura)=>{
            console.log("res", detalji);
            this.detaljiTure = detalji;
            console.log("detalji", this.detaljiTure);
          })
        }else{
          console.log("nema parametra query-a")
        }
      }
    );
  }

}
