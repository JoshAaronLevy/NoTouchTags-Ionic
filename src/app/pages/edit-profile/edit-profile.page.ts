import { Component, OnInit } from '@angular/core';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';
import { parseResult } from 'src/shared/parseResults';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userId: string;
  userEdit: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  previousRoute: string;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    this.userId = localStorage.getItem('userId');
    query.get(this.userId).then((user) => {
      this.user = parseResult(user);
      console.log(this.user);
      this.userEdit = this.formBuilder.group({
        firstName: this.user.firstName,
        lastName: this.user.lastName
      });
    }, (error) => {
      this.presentUserErrorToast(error);
    });
    this.previousRoute = localStorage.getItem('previousRoute');
    this.previousRoute = `/${this.previousRoute}`;
  }

  async presentUserErrorToast(error) {
    const toast = await this.toastController.create({
      message: error,
      position: 'top',
      color: 'danger',
      duration: 5000
    });
    toast.present();
  }

  editUser() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    query.get(this.userId).then((user) => {
      user.set('firstName', this.userEdit.value.firstName);
      user.save().then((response) => {
        console.log('Updated user', response);
      }).catch((error) => {
        console.error('Error while updating user', error);
      });
    });
  }
}
