import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  SignInWithApple,
  ASAuthorizationAppleIDRequest,
  AppleSignInResponse,
  AppleSignInErrorResponse
} from '@ionic-native/sign-in-with-apple/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';
import { Router } from '@angular/router';
import { storeUser } from 'src/shared/userHelper';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [
    SignInWithApple
  ]
})
export class RegisterPage implements OnInit {
  isApple: boolean;
  userSignup: FormGroup;
  isAgent: string;
  userPointer: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    public router: Router,
    private signInWithApple: SignInWithApple,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    this.isAgent = 'NO';
    if (this.platform.is('ios') === true) {
      this.isApple = true;
    } else {
      this.isApple = false;
    }
    this.userSignup = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  }

  changeOwnership(val) {
    this.isAgent = val;
  }

  async ownerManagerHelp() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tag Owner/Manager',
      message: `Select 'YES' if you are a store owner or will be managing tags for a business. If you are a customer, choose 'NO'`,
      buttons: [
        {
          text: 'Ok',
          handler: () => { }
        }
      ]
    });
    await alert.present();
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

  signup() {
    const user = new Parse.User();
    const fullName = `${this.userSignup.value.firstName} ${this.userSignup.value.lastName}`;
    user.set('firstName', this.userSignup.value.firstName);
    user.set('lastName', this.userSignup.value.lastName);
    user.set('fullname', fullName);
    user.set('fullname_lower', fullName.toLowerCase());
    user.set('username', this.userSignup.value.email);
    user.set('email', this.userSignup.value.email);
    user.set('accountemail', this.userSignup.value.email);
    user.set('emailCopy', this.userSignup.value.email);
    user.set('password', this.userSignup.value.password);
    user.set('isagentyn', this.isAgent);
    if (this.isAgent === 'YES') {
      user.set('agentID', this.userSignup.value.email);
    }
    user.signUp().then((user) => {
      this.userPointer = user;
      storeUser(user);
      if (this.isAgent === 'YES') {
        this.agentSignup();
      } else {
        this.router.navigate(['/tags']);
      }
    }).catch((error) => {
      console.log(error);
      this.presentSignupErrorToast(error);
    });
  }

  agentSignup() {
    const Agent = Parse.Object.extend('Agents');
    const agent = new Agent();
    const fullName = `${this.userSignup.value.firstName} ${this.userSignup.value.lastName}`;
    agent.set('agentDisplayName', fullName);
    agent.set('agentEmail', this.userSignup.value.email);
    agent.set('email', this.userSignup.value.email);
    agent.set('agentID', this.userSignup.value.email);
    agent.set('user', this.userPointer);
    agent.set('userPointer', this.userPointer);
    agent.save().then((response) => {
      this.router.navigate(['/tags']);
      return response;
    }).catch((error) => {
      console.log(error);
      this.presentSignupErrorToast(error);
    });
  }

  async presentSignupErrorToast(error) {
    const toast = await this.toastController.create({
      message: error,
      position: 'top',
      color: 'danger',
      duration: 4000
    });
    toast.present();
  }
}
