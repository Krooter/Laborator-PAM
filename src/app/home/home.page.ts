import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    const token = localStorage.getItem('token');
    if(token){
      this.authService.decodedToken = token;
      this.router['/homescreen'];
    }
  }
}
