import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginRegServisService {

  constructor(private http:HttpClient) { }

  uri = `http://localhost:4000`;
  
  login(data){
    // const data = {
    //   kor_ime: kor_ime,
    //   lozinka: lozinka
    // }

    return this.http.post(`${this.uri}/home/login`, data);
  }

  register(formData: FormData){ //probacu da prosledim sve odjednom ako moze
    return this.http.post(`${this.uri}/home/register`, formData);
  }

  registerBuyer(formData: FormData){
    const data = {
      ime_prezime: formData.get("ime_prezime"),
      kor_ime: formData.get("kor_ime"),
      lozinka: formData.get("lozinka"),
      telefon: formData.get("telefon"),
      email: formData.get("email")
    }
    console.log("prosledjeno funkciji", data);
    return this.http.post(`${this.uri}/home/registerBuyer`, data);
  }

  changePass(user, newPass){
    const data = {
      kor_ime: user,
      lozinka: newPass
    }
    return this.http.post(`${this.uri}/home/changePass`, data);
  }

}
