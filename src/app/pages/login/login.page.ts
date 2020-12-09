import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  model: any = {};
  constructor(private authService: AuthService, private router: Router, private loading: LoadingController) { }

  ngOnInit(){
  }

  login(){
    this.load();
    this.authService.login(this.model).then(next => {
      this.router.navigate(['./homescreen']);
      console.log("succes login")
    }, error =>{
      console.log('error');
    })
  }

  async load() {
    const loading = await this.loading.create({
      cssClass: 'loading',
      spinner: 'bubbles',
      message: 'Logging in, please wait...',
      duration: 10000
    });
    await loading.present();
  }
}
