import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'watch',
    loadChildren: () => import('./pages/watch/watch.module').then( m => m.WatchPageModule)
  },
  {
    path: 'forniture',
    loadChildren: () => import('./pages/forniture/forniture.module').then( m => m.ForniturePageModule)
  },
  {
    path: 'clothes',
    loadChildren: () => import('./pages/clothes/clothes.module').then( m => m.ClothesPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./pages/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'mosaic',
    loadChildren: () => import('./pages/mosaic/mosaic.module').then( m => m.MosaicPageModule)
  },
  {
    path: 'catalog',
    loadChildren: () => import('./pages/catalog/catalog.module').then( m => m.CatalogPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./pages/cards/cards.module').then( m => m.CardsPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./pages/address/address.module').then( m => m.AddressPageModule)
  },
  {
    path: 'hero',
    loadChildren: () => import('./pages/hero/hero.module').then( m => m.HeroPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then( m => m.ResultPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'discover',
    loadChildren: () => import('./pages/discover/discover.module').then( m => m.DiscoverPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
