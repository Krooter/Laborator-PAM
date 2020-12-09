import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#33000000');
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(token){
      this.authService.decodedToken = token;
    }
    if(user){
      this.authService.currentUser = user;
    }
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
    });
  }
}
