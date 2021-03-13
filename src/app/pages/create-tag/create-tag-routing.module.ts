import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTagPage } from './create-tag.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTagPageRoutingModule { }
