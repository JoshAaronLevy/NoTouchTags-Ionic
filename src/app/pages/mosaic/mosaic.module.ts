import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MosaicPageRoutingModule } from './mosaic-routing.module';

import { MosaicPage } from './mosaic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MosaicPageRoutingModule
  ],
  declarations: [MosaicPage]
})
export class MosaicPageModule {}
