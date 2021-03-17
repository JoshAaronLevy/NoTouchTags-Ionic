import { Component, OnInit } from '@angular/core';
import {
  SignInWithApple,
  ASAuthorizationAppleIDRequest,
  AppleSignInResponse,
  AppleSignInErrorResponse
} from '@ionic-native/sign-in-with-apple/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isApple: boolean;
  constructor(
    private platform: Platform,
    private signInWithApple: SignInWithApple
  ) { }

  ngOnInit() {
    if (this.platform.is('ios') === true) {
      this.isApple = true;
    } else {
      this.isApple = false;
    }
  }

  AppleSignIn() {
    this.signInWithApple
      .signin({
        requestedScopes: [
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
        ]
      })
      .then((res: AppleSignInResponse) => {
        console.log('Apple login success:- ' + res);
      })
      .catch((error: AppleSignInErrorResponse) => {
        console.error(error);
      });
  }

}
