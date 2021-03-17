import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  SignInWithApple,
  ASAuthorizationAppleIDRequest,
  AppleSignInResponse,
  AppleSignInErrorResponse
} from '@ionic-native/sign-in-with-apple/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';
import { Router } from '@angular/router';
import { getStoredUser, storeUser } from 'src/shared/userHelper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isApple: boolean;
  username: string;
  userLogin: FormGroup;
  userEmail: string;
  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    public router: Router,
    private signInWithApple: SignInWithApple,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    this.username = getStoredUser().username;
    if (this.username != null) {
      this.router.navigate(['/tags']);
    }
    if (this.platform.is('ios') === true) {
      this.isApple = true;
    } else {
      this.isApple = false;
    }
    this.userLogin = this.formBuilder.group({
      userName: '',
      password: '',
    });
  }

  login() {
    Parse.User.logIn(this.userLogin.value.userName, this.userLogin.value.password).then((user) => {
      storeUser(user);
      this.router.navigate(['/tags']);
      console.log(user);
    }).catch((error) => {
      this.presentLoginErrorToast(error);
    });
  }

  async presentResetPasswordPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reset Password',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'info@email.com'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Canceled');
          }
        }, {
          text: 'Submit',
          handler: (inputs) => {
            this.userEmail = inputs.email;
            this.forgotPassword(this.userEmail);
          }
        }
      ]
    });
    await alert.present();
  }

  forgotPassword(email) {
    Parse.User.requestPasswordReset(email).then(() => {
      this.presentResetPasswordToast(email);
    });
  }

  async presentLoginErrorToast(error) {
    const toast = await this.toastController.create({
      message: error,
      position: 'top',
      color: 'danger',
      duration: 4000
    });
    toast.present();
  }

  async presentResetPasswordToast(email) {
    const toast = await this.toastController.create({
      message: `Password reset email sent to ${email}`,
      position: 'top',
      color: 'success',
      duration: 5000
    });
    toast.present();
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
