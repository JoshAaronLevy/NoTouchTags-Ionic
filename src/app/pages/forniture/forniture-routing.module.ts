import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForniturePage } from './forniture.page';

const routes: Routes = [
  {
    path: '',
    component: ForniturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForniturePageRoutingModule {}
