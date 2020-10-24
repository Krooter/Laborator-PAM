import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddModalPageRoutingModule } from './add-modal-routing.module';

import { AddModalPage } from './add-modal.page';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddModalPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [AddModalPage]
})
export class AddModalPageModule {}
