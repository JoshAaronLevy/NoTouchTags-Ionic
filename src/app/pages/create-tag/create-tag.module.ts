import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateTagPageRoutingModule } from './create-tag-routing.module';
import { CreateTagPage } from './create-tag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateTagPageRoutingModule
  ],
  declarations: [CreateTagPage]
})
export class CreateTagPageModule { }
