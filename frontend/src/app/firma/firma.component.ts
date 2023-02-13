import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { FirmaServisService } from '../servisi/firma-servis.service';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent implements OnInit {

  constructor(private servis: FirmaServisService, private ruter:Router) {
    this.indexes = [1, 2, 3, 4, 5];
   }

  active = 1;
  formaHotel: FormGroup;
  formaSki: FormGroup;
  formaPlan: FormGroup;
  vrste_soba_data = [
    { id: 1, name: 'jednokrevetna' },
    { id: 2, name: 'dvokrevetna' },
    { id: 3, name: 'sa pogledom na prirodu' }
  ];

  opremljenost_data = [
    { id: 1, name: 'Wi-Fi' },
    { id: 2, name: 'klima' },
    { id: 3, name: 'TV' },
    { id: 4, name: 'mini bar'},
    { id: 5, name: 'krevetac za bebe'}
  ];

  hrana_data = [
    { id: 1, name: 'polupansion' },
    { id: 2, name: 'pun pansion' },
    { id: 3, name: 'restoran a la carte' },
  ]

  //za slike
  filesSmestaj:string [] = [];
  filesSki: string [] = [];

  message: string;
  ulogovan: Korisnik; //firma

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("Ulogovana firma", this.ulogovan);
    
    this.formaHotel = new FormGroup({
      kategorija: new FormControl('', [Validators.required]),
      vrste_soba: new FormArray([
        // new FormGroup({
        //   jednokreventna: new FormControl('', [Validators.required]),
        //   dvokrevetna: new FormControl('', [Validators.required]),
        //   sa_pogledom: new FormControl('', [Validators.required])
        // })
      ], [Validators.required]),
      opremljenost: new FormArray([], [Validators.required]),
      ziro_racun_h: new FormArray([
        new FormGroup({broj: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^\d{3}-\d{12}-\d{2}$/)
        ]
        )
      })
      ], [Validators.required]),
      hrana: new FormArray([], [Validators.required]),
      soba: new FormArray([
        new FormGroup({
          tipS: new FormControl('', [Validators.required]),
          cena_nocenja: new FormControl('', [Validators.required]),
          br_soba: new FormControl('', [Validators.required])
        })
      ], [Validators.required]),
      br_zvezdica: new FormControl('', [Validators.required]),
      relax: new FormControl(false),
      dodatno: new FormControl(''),
      media: new FormControl(''), ////ovo mi je formControlName
      //fileSource: new FormControl(''), //ovo mi je fajl source
    });

    this.addCheckboxes();

    this.formaSki = new FormGroup({
      casovi_za: new FormControl('', [Validators.required]),
      instruktor: new FormArray([
        new FormGroup({
          ime_prezime: new FormControl('', [Validators.required]),
          drzi_za: new FormControl([], [Validators.required]) //sta drzi taj instruktor
        })
      ], [Validators.required]),
      cena_casa: new FormControl('', [Validators.required]),
      oprema: new FormControl('', [Validators.required]),
      cena_opreme: new FormControl(0, [Validators.required]),
      ziro_racun_s: new FormArray([
        new FormGroup({broj: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^\d{3}-\d{12}-\d{2}$/)
        ]
        )
      })
      ], [Validators.required]),
      proizvodjaci: new FormArray([
        new FormGroup({
          naziv: new FormControl('', [Validators.required])
        })
      ], [Validators.required]),
      media: new FormControl(''), ////ovo mi je formControlName
      //fileSource: new FormControl([]), //ovo mi je fajl source
    })

    this.formaPlan = new FormGroup({
      planine: new FormArray([
        new FormGroup({
          naziv: new FormControl('', [Validators.required])
        })
      ], [Validators.required]),
      ziro_racun_p: new FormArray([
        new FormGroup({broj: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^\d{3}-\d{12}-\d{2}$/)
        ]
        )
      })
      ], [Validators.required]),
    })

  }

  get ziro_racun_h(): FormArray {
    return this.formaHotel.get('ziro_racun_h') as FormArray;
  }

  noviZiroRacun_h(){
    this.ziro_racun_h.push(
      new FormGroup({
        broj: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^\d{3}-\d{12}-\d{2}$/)
        ]
        )
      })
    );
  }

  get ziro_racun_s(): FormArray {
    return this.formaSki.get('ziro_racun_s') as FormArray;
  }

  noviZiroRacun_s(){
    this.ziro_racun_s.push(
      new FormGroup({
        broj: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^\d{3}-\d{12}-\d{2}$/)
        ]
        )
      })
    );
  }

  get ziro_racun_p(): FormArray {
    return this.formaPlan.get('ziro_racun_p') as FormArray;
  }

  noviZiroRacun_p(){
    this.ziro_racun_p.push(
      new FormGroup({
        broj: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^\d{3}-\d{12}-\d{2}$/)
        ]
        )
      })
    );
  }

  indexes: number[];
  rating: number;
  rate(i) {
    this.rating = this.indexes[i-1];
    this.formaHotel.value.br_zvezdica = this.rating;
  }

  logout(){
    let user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('loggedInUser');
    this.ruter.navigate(['']);
  }

  private addCheckboxes() {
    this.vrste_soba_data.forEach(() => this.vrsteSobaFormArray.push(new FormControl(false)));
    this.opremljenost_data.forEach(() => this.opremljenostFormArray.push(new FormControl(false)));
    this.hrana_data.forEach(() => this.hranaFormArray.push(new FormControl(false)));

  }

  public myError = (controlName: string, errorName: string) =>{
    return this.formaHotel.controls[controlName].hasError(errorName);
  }

  public myErrorSki = (controlName: string, errorName: string) =>{
    return this.formaSki.controls[controlName].hasError(errorName);
  }

  public myErrorPlaninari = (controlName: string, errorName: string) =>{
    return this.formaPlan.controls[controlName].hasError(errorName);
  }

  get soba(): FormArray {
    return this.formaHotel.get('soba') as FormArray;
  }

  get vrsteSobaFormArray() {
    return this.formaHotel.controls.vrste_soba as FormArray;
  }

  get opremljenostFormArray() {
    return this.formaHotel.controls.opremljenost as FormArray;
  }

  get hranaFormArray() {
    return this.formaHotel.controls.hrana as FormArray;
  }

  get instruktor(): FormArray {
    return this.formaSki.get('instruktor') as FormArray;
  }
  
  get planine(): FormArray {
    return this.formaPlan.get('planine') as FormArray;
  }

  novaPlanina(){
    this.planine.push(
      new FormGroup({
        naziv: new FormControl('', [Validators.required])
      })
    );
  }

  novInstruktor(){
    this.instruktor.push(
      new FormGroup({
        ime_prezime: new FormControl('', [Validators.required]),
        drzi_za: new FormControl('', [Validators.required])
      })
    );
  }

  novaSoba(){
    this.soba.push(
      new FormGroup({
        tipS: new FormControl('', [Validators.required]),
        cena_nocenja: new FormControl('', [Validators.required]),
        br_soba: new FormControl('', [Validators.required])
      })
    );
  }

  onFileChange(event){
    for (var i = 0; i < event.target.files.length; i++) { 
      this.filesSmestaj.push(event.target.files[i]);
    }
  }

  onFileChangeSki(event){
    for (var i = 0; i < event.target.files.length; i++) { 
      this.filesSki.push(event.target.files[i]);
    }
  }

  handleTheError(error: HttpErrorResponse){
    console.log("usla u handler")
    this.message = error.error.message;
  }
  
  unesiPodatkeHotel(){
    console.log("vrste soba", this.formaHotel.value.vrste_soba)
    const selectedRoomName = this.formaHotel.value.vrste_soba
      .map((checked, i) => checked ? this.vrste_soba_data[i].name : null)
      .filter(v => v !== null);
    console.log("selektovane sobe", selectedRoomName);
    this.formaHotel.value.vrste_soba = selectedRoomName;

    console.log("opremljenost", this.formaHotel.value.opremljenost)
    const selectedTehName = this.formaHotel.value.opremljenost
      .map((checked, i) => checked ? this.opremljenost_data[i].name : null)
      .filter(v => v !== null);
    console.log("selektovana oprema", selectedTehName);
    this.formaHotel.value.opremljenost = selectedTehName;

    console.log("ishrana", this.formaHotel.value.hrana)
    const selectedFoodName = this.formaHotel.value.hrana
      .map((checked, i) => checked ? this.hrana_data[i].name : null)
      .filter(v => v !== null);
    console.log("selektovana ishrana", selectedFoodName);
    this.formaHotel.value.hrana = selectedFoodName;

    const form = new FormData();
    form.append('kor_ime', this.ulogovan.kor_ime);
    for (var i = 0; i < this.filesSmestaj.length; i++) { 
      form.append("file[]", this.filesSmestaj[i]);
    }
    console.log("cela forma", this.formaHotel.value);
    console.log("formFIles", form);

    this.formaHotel.value.br_zvezdica = this.rating;
    
    this.servis.addData(this.formaHotel.value, this.ulogovan.kor_ime, this.ulogovan._id, this.ulogovan.nazivP).subscribe((res:any)=>{
      console.log(res);
      
      if(res!=null){
        this.servis.addImages(form).subscribe((res2:any)=>{
          console.log(res2);
          this.filesSmestaj = [];
          if(res.message == "Uspesno dodati podaci!") this.ruter.navigate(['/firme/smestaj']);
        })
      } 
    })

    
  }

  unesiPodatkeSki(){
    console.log("ski casovi", this.formaSki.value.casovi_za);
    console.log("instruktor", this.formaSki.value.instruktor);
    console.log("cela forma", this.formaSki.value);

    const formFiles = new FormData();
    formFiles.append('kor_ime', this.ulogovan.kor_ime);
    for (var i = 0; i < this.filesSki.length; i++) { 
      formFiles.append("file[]", this.filesSki[i]);
    }

    this.formaSki.value.media = this.filesSki;
    console.log("instruktori",this.instruktor.value);
    console.log("slikeSki", this.filesSki);
    console.log("slikeSki forma", this.formaSki.value.media);
    console.log("formFIles", formFiles);

    this.servis.addDataSki(this.formaSki.value, this.ulogovan.kor_ime, this.ulogovan._id, this.ulogovan.nazivP).subscribe((res:any)=>{
      console.log(res);
      if(res!=null){
        this.servis.addImages(formFiles).subscribe((res2:any)=>{
          console.log(res2);
          this.filesSki = [];
          if(res.message == "Uspesno dodati podaci!") this.ruter.navigate(['/firme/ski_skola']);
        })
      } 
    })

    
  }

  unesiPodatkePlan(){

    this.servis.addDataPlaninari(this.formaPlan.value, this.ulogovan.kor_ime, this.ulogovan._id, this.ulogovan.nazivP).subscribe((res:any)=>{
      console.log(res);
      if(res.message == "Uspesno dodati podaci!") this.ruter.navigate(['/firme/planinari']);
    })

  }

}
