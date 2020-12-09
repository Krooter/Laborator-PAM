import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { HTTP } from '@ionic-native/http/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { BarRatingModule } from "ngx-bar-rating";
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    BarRatingModule,
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['http://81.180.72.17/*'],
        disallowedRoutes: ['localhost:5000/api/Login/UserAuth'],
      },
    })
  ],
  providers: [
    StatusBar,
    DatePipe, 
    AuthService,
    SplashScreen,
    NativeGeocoder,
    HTTP,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('token');
}
