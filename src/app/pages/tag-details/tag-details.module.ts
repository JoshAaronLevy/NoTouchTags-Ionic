import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagDetailsPageRoutingModule } from './tag-details-routing.module';

import { TagDetailsPage } from './tag-details';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagDetailsPageRoutingModule
  ],
  declarations: [TagDetailsPage]
})
export class TagDetailsPageModule { }
