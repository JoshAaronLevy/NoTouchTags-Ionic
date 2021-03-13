import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyTagsPageRoutingModule } from './my-tags-routing.module';
import { MyTagsPage } from './my-tags.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTagsPageRoutingModule
  ],
  declarations: [
    MyTagsPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MyTagsPageModule { }
