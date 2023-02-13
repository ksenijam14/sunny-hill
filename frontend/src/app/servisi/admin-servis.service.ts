import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServisService {

  constructor(private http:HttpClient) { }

  uri = `http://localhost:4000`;

  getAllCompanies(){ //probacu da prosledim sve odjednom ako moze
    return this.http.get(`${this.uri}/admin/getAllCompanies`);
  }

  aktivirajNalog(idPreduzeca){
    const data = {
      idP: idPreduzeca
    }
    return this.http.post(`${this.uri}/admin/activateCompany`, data);
  }

  deaktivirajNalog(idPreduzeca){
    const data = {
      idP: idPreduzeca
    }
    return this.http.post(`${this.uri}/admin/deactivateCompany`, data);
  }

  sendEmail(name, email, message) { 
    /* na odgovarajucu rutu na serveru se salje telo mejla */
    const data = {
      name: name,
      email: email,
      message: message,
    };
    return this.http.post(`${this.uri}/admin/sendmail`, data);
  }

}

