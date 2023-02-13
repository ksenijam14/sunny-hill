import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {

  constructor(private http:HttpClient) { }

  uri = `http://localhost:4000`;

  dohvSveSkiSkole(){
    return this.http.get(`${this.uri}/firma/getAllSki`);
  }

  detaljiSkole(id_skole){
    return this.http.get(`${this.uri}/firma/detaljiSkole?idSkole=${id_skole}`);
  }

  rezSkiCas(form, skola){
    const data={
      form: form,
      idSkole: skola
    }
    return this.http.post(`${this.uri}/firma/rezSkiCas`, data);
  }

  dohvRezervacije(id_instr, datum){ //dohvata rezervacije od instruktora za neki odredjeni datum
    const data = {
      id_instruktora: id_instr,
      datum: datum
    }
    return this.http.post(`${this.uri}/firma/dohvRezervacije`, data);
  }

  dohvSvePlaninare(){
    return this.http.get(`${this.uri}/firma/getAllPlaninari`);
  }

  dohvSvePlaninareIdetalje(){
    return this.http.get(`${this.uri}/firma/getAllPlanAndDet`);
  }

  rezPlanTura(form, idTure){
    const data = {
      form: form,
      // kor_ime: kor_ime,
      // email: email,
      idTure: idTure
    }
    return this.http.post(`${this.uri}/firma/rezPlanTura`, data);
  }

  dohvSveSmestaje(){
    return this.http.get(`${this.uri}/firma/dohvSveSmestaje`);
  }

  detaljiSmestaja(idHotela){
    return this.http.get(`${this.uri}/firma/detaljiSmestaja?idHotela=${idHotela}`)
  }

  // getFreeDates(tip_sobe){
  //   const data = {
  //     tipS: tip_sobe
  //   }
  //   return this.http.post(`${this.uri}/firma/getFreeDates`, data);
  // }

  rezSmestaj(form, idHotela){
    const data = {
      form: form,
      idHotela: idHotela
    }
    return this.http.post(`${this.uri}/firma/rezSmestaj`, data);
  }

  searchRezSkiByKor(kor_ime){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/firma/searchRezSkiByKor`, data);
  }

  searchRezSmByKor(kor_ime){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/firma/searchRezSmByKor`, data);
  }
  
  searchRezPlanByKor(kor_ime){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/firma/searchRezPlanByKor`, data);
  }

}
