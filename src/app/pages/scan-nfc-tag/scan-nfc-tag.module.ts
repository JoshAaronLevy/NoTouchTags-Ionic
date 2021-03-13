import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanNFCTagPageRoutingModule } from './scan-nfc-tag-routing.module';

import { ScanNFCTagPage } from './scan-nfc-tag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanNFCTagPageRoutingModule
  ],
  declarations: [ScanNFCTagPage]
})
export class ScanNFCTagPageModule { }
