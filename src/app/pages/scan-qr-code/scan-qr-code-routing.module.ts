import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanQRCodePage } from './scan-qr-code.page';

const routes: Routes = [
  {
    path: '',
    component: ScanQRCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanQRCodePageRoutingModule { }
