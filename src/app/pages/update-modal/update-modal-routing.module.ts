import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateModalPage } from './update-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateModalPageRoutingModule {}
