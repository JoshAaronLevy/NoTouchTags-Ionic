import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  providers: [
    SignInWithApple
  ],
  declarations: [
    LoginPage
  ]
})
export class LoginPageModule { }
