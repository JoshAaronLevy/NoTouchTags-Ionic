import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'scan-nfc-tag',
    loadChildren: () => import('./pages/scan-nfc-tag/scan-nfc-tag.module').then(m => m.ScanNFCTagPageModule)
  },
  {
    path: 'scan-qr-code',
    loadChildren: () => import('./pages/scan-qr-code/scan-qr-code.module').then(m => m.ScanQRCodePageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductPageModule)
  },
  {
    path: 'tag/:id',
    loadChildren: () => import('./pages/tag-details/tag-details.module').then(m => m.TagDetailsPageModule)
  },
  {
    path: 'tags',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'my-tags',
    loadChildren: () => import('./pages/my-tags/my-tags.module').then(m => m.MyTagsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
