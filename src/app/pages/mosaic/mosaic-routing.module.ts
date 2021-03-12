import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MosaicPage } from './mosaic.page';

const routes: Routes = [
  {
    path: '',
    component: MosaicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MosaicPageRoutingModule {}
