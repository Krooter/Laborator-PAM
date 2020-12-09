import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorReqPageRoutingModule } from './doctor-req-routing.module';

import { DoctorReqPage } from './doctor-req.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorReqPageRoutingModule
  ],
  declarations: [DoctorReqPage]
})
export class DoctorReqPageModule {}
