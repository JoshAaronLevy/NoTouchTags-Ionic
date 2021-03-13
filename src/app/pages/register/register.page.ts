import { Component, OnInit } from '@angular/core';
import {
  SignInWithApple,
  ASAuthorizationAppleIDRequest,
  AppleSignInResponse,
  AppleSignInErrorResponse
} from '@ionic-native/sign-in-with-apple/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [
    SignInWithApple
  ]
})
export class RegisterPage implements OnInit {

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
