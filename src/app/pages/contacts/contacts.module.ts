import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarRatingModule,
    ContactsPageRoutingModule
  ],
  declarations: [ContactsPage]
})
export class ContactsPageModule {}
