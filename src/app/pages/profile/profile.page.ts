import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';
import { clearUser } from 'src/shared/userHelper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  theme: string;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public actionSheetController: ActionSheetController
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
    clearUser();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 10);
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
            Parse.User.logOut().then(() => {
              this.signOut();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Scan Mode',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Scan NFC Tag',
          icon: 'albums-outline',
          handler: () => {
            this.router.navigate(['/scan-nfc-tag']);
          }
        }, {
          text: 'Scan QR Code',
          icon: 'qr-code-outline',
          handler: () => {
            this.router.navigate(['/scan-qr-code']);
          }
        }
      ]
    });
    await actionSheet.present();
  }

  routeToTags() {
    this.router.navigate(['/tags']);
  }

  routeToSettings() {
    this.router.navigate(['/settings']);
  }
}
