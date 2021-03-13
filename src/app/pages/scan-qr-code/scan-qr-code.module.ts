import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanQRCodePageRoutingModule } from './scan-qr-code-routing.module';

import { ScanQRCodePage } from './scan-qr-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanQRCodePageRoutingModule
  ],
  declarations: [ScanQRCodePage]
})
export class ScanQRCodePageModule { }
