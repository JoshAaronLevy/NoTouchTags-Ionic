import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTagPageRoutingModule } from './create-tag-routing.module';

import { CreateTagPage } from './create-tag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTagPageRoutingModule
  ],
  declarations: [CreateTagPage]
})
export class CreateTagPageModule { }
