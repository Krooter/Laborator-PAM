import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorReqPage } from './doctor-req.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorReqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorReqPageRoutingModule {}
