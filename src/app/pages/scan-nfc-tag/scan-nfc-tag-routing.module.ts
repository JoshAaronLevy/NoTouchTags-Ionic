import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanNFCTagPage } from './scan-nfc-tag.page';

const routes: Routes = [
  {
    path: '',
    component: ScanNFCTagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanNFCTagPageRoutingModule { }
