import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  currentUser: User;
  decodedToken: any;

  constructor(private http2: HTTP) { 

  }

  login(model: any){
    return this.http2.post(this.baseUrl + 'Login/UserAuth', model, {}).then(
      (response: any) => {
        const user = response;
        localStorage.setItem('token', JSON.parse(user.data).Message);
      })
  }

  async register(model: any){
    return await this.http2.post(this.baseUrl + 'Register/UserReg', model, {});
  }
}
