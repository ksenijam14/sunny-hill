import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirmaServisService {

  constructor(private http:HttpClient) { }

  uri = `http://localhost:4000`;

  addData(form, kor_ime, idF, nazivP ){
    const data = {
      form: form,
      kor_ime: kor_ime,
      idF: idF,
      nazivP: nazivP
    }
    return this.http.post(`${this.uri}/firma/addDataSmestaj`, data); 
  }

  addDataSki(form, kor_ime, idF, nazivP ){
    const data = {
      form: form,
      kor_ime: kor_ime,
      idF: idF,
      nazivP: nazivP
    }
    return this.http.post(`${this.uri}/firma/addDataSkiSkola`, data); 
  }

  addDataPlaninari(form, kor_ime, idF, nazivP ){
    const data = {
      form: form,
      kor_ime: kor_ime,
      idF: idF,
      nazivP: nazivP
    }
    return this.http.post(`${this.uri}/firma/addDataPlaninari`, data); 
  }

  addImages(form: FormData){
    // const data = {
    //   form: form,
    //   kor_ime: kor_ime,
    // }
    return this.http.post(`${this.uri}/firma/addImages`, form); 
  }

  getAllUsers(){
    return this.http.get(`${this.uri}/firma/getAllUsers`);
  }

  getAllDetaljiFirme(){ //vraca detalje svih firmi
    return this.http.get(`${this.uri}/firma/getAllDetaljiFirme`);
  }

  getFirmaOsnovno(idFirme){
    const data = {
      idP: idFirme
    }
    return this.http.post(`${this.uri}/firma/getFirmaOsnovno`, data);
    
  }

  getDetaljiFirme(kor_ime){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/firma/getDetaljiFirme`, data);
  }

  getDetaljiFirmeById(idFirme){
    const data = {
      idF: idFirme
    }
    return this.http.post(`${this.uri}/firma/getDetaljiFirmeById`, data);
  }


  ///---planinarsko drustvo--///
  novaTura(form:FormData){
    return this.http.post(`${this.uri}/planinari/addNewTour`, form);
  }

  getAllPlanTure(){
    return this.http.get(`${this.uri}/firma/getAllPlanTure`);
  }

  dohvatiSveTure(idPlaninara){
    const data = {
      idP: idPlaninara
    }
    return this.http.post(`${this.uri}/planinari/getPlaninskaTura`, data);
  }

  detaljiTure(id_ture){
    return this.http.get(`${this.uri}/planinari/detaljiTure?idTure=${id_ture}`);
  }

  dohvRezervacijePlan(idPlan){
    const data = {
      idPlan: idPlan
    }
    return this.http.post(`${this.uri}/firma/dohvRezervacijePlan`, data);
  }

  //ski_skola
  dohvRezervacijeSkole(idSk){
    const data = {
      idSkole: idSk
    }
    return this.http.post(`${this.uri}/firma/dohvRezervacijeSkole`, data);
  }

  prihvatiRezSki(idRez){
    const data = {
      idRez: idRez
    }
    return this.http.post(`${this.uri}/firma/prihvatiRezSki`, data);
  }

  odbijRezSki(idRez){
    const data = {
      idRez: idRez
    }
    return this.http.post(`${this.uri}/firma/odbijRezSki`, data);
  }


  //hoteli apartmani
  dohvRezervacijeSmestaj(idSk){
    const data = {
      idSm: idSk
    }
    return this.http.post(`${this.uri}/firma/dohvRezervacijeSmestaj`, data);
  }

  prihvatiRezTura(idRez){
    const data = {
      idRez: idRez
    }
    return this.http.post(`${this.uri}/firma/prihvatiRezTura`, data);
  }

  odbijRezTura(idRez){
    const data = {
      idRez: idRez
    }
    return this.http.post(`${this.uri}/firma/odbijRezTura`, data);
  }

  dohvSvePlanTura(idPlan){ //isto sto i dohvatiSveTure, slucajno sam napisala dva puta, obe funkcije rade isti posao
    const data = {
      idPlan: idPlan
    }
    return this.http.post(`${this.uri}/firma/dohvSvePlanTura`, data);
  }

  prihvatiRezSmestaj(idRez){
    const data = {
      idRez: idRez
    }
    return this.http.post(`${this.uri}/firma/prihvatiRezSmestaj`, data);
  }

  odbijRezSmestaj(idRez){
    const data = {
      idRez: idRez
    }
    return this.http.post(`${this.uri}/firma/odbijRezSmestaj`, data);
  }

  editPopust(idHotela, noviPopust){
    const data = {
      idHotela: idHotela,
      noviPopust: noviPopust
    }

    return this.http.post(`${this.uri}/firma/editPopust`, data);
  }

  addComment(form, idFirme, kor_ime){
    const data = {
      form: form,
      idF: idFirme,
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/firma/addComment`, data);
  }

  updateOcena(idFirme, ocena){
    const data = {
      idF: idFirme,
      ocena: ocena
    }
    return this.http.post(`${this.uri}/firma/updateOcena`, data);
  }

  dohvSvePlanine(){
    return this.http.get(`${this.uri}/planinari/dohvSvePlanine`);
  }

  dohvSvePlanineDrzave(drzava){
    const data = {
      drzava: drzava
    }
    return this.http.post(`${this.uri}/planinari/dohvSvePlanineDrzave`, data);
  }


}
