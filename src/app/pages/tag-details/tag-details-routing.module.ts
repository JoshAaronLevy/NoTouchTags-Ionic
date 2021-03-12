import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagDetailsPage } from './tag-details';

const routes: Routes = [
  {
    path: '',
    component: TagDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagDetailsPageRoutingModule { }
