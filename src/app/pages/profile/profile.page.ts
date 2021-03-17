import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  theme: string;

  constructor(
    public alertController: AlertController,
    public router: Router
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    if (localStorage.getItem('theme') === 'dark') {
      this.theme = 'dark';
      this.enableDarkTheme();
    } else if (localStorage.getItem('theme') === undefined || localStorage.getItem('theme') === null) {
      this.theme = 'light';
      this.enableLightTheme();
    } else {
      this.theme = 'light';
      this.enableLightTheme();
    }
  }

  enableLightTheme() {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    this.theme = 'light';
  }

  enableDarkTheme() {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    this.theme = 'dark';
  }

  setPrevious() {
    localStorage.removeItem('previousRoute');
    localStorage.setItem('previousRoute', 'profile');
  }

  showDetail(title) {
    const nav = document.querySelector('ion-nav');
    nav.push('nav-detail', title);
  }

  async changeTheme() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Change Theme',
      buttons: [
        {
          text: 'Light',
          handler: () => {
            this.enableLightTheme();
          }
        }, {
          text: 'Dark',
          handler: () => {
            this.enableDarkTheme();
          }
        }
      ]
    });
    await alert.present();
  }

  signOut() {
    console.log('Signed Out!');
    this.router.navigate(['/login']);
  }

  async presentSignOutConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sign Out',
      subHeader: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            Parse.User.signOut().then(() => {
              this.signOut();
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
