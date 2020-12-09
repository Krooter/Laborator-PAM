import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  token = localStorage.token;

  constructor(private http2: HTTP) { }

  getDoctors(tokenDecoded: any){
    this.http2.setDataSerializer('json');
    return this.http2.get(this.baseUrl + "Doctor/GetDoctorList", {}, {token: tokenDecoded});
  }

  getDoctorDetail(id: any, tokenDecoded: any){
    this.http2.setDataSerializer('json');
    return this.http2.get(this.baseUrl + "Doctor/GetDoctor/" + id, {}, {token: tokenDecoded})
  }

  getProfile(tokenDecoded: any){
    this.http2.setDataSerializer('json');
    return this.http2.get(this.baseUrl + "Profile/GetProfile", {}, {token: tokenDecoded});
  }

  postConsult(model: any, tokenDecoded: any){
    this.http2.setDataSerializer('json');
    return this.http2.post(this.baseUrl + 'Doctor/AddConsultation', model, {token: tokenDecoded});
  }

}
