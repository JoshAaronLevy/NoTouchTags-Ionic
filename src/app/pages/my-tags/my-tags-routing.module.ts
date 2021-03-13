import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTagsPage } from './my-tags.page';

const routes: Routes = [
  {
    path: '',
    component: MyTagsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTagsPageRoutingModule { }
