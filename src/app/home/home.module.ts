import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NgCalendarModule } from 'ionic2-calendar';

import { registerLocaleData } from '@angular/common';
import localeEN from '@angular/common/locales/en';
import { AddModalPageModule } from '../pages/add-modal/add-modal.module';
import { UpdateModalPage } from '../pages/update-modal/update-modal.page';
import { UpdateModalPageModule } from '../pages/update-modal/update-modal.module';
import { LocalNotifications } from '@ionic-native/local-notifications';
registerLocaleData(localeEN);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgCalendarModule,
    AddModalPageModule,
    UpdateModalPageModule
  ],
  declarations: [
    HomePage,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-EN' },
    LocalNotifications
  ]
})
export class HomePageModule {}
