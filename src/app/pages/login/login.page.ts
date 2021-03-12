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

  constructor(
    private signInWithApple: SignInWithApple
  ) { }

  ngOnInit() { }

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
