import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: 'tabs/tab1',
      icon: 'list'
    },

    {
      title: 'Catalog',
      url: '/catalog',
      icon: 'list'
    },
    {
      title: 'Account',
      url: '/account',
      icon: 'list'
    },
    {
      title: 'Index',
      url: '/index',
      icon: 'list'
    }

  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public actionSheetController: ActionSheetController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Scan Mode',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'NFC Tag',
          icon: 'albums-outline',
          handler: () => {
            console.log('NFC Tag clicked');
          }
        }, {
          text: 'QR Code',
          icon: 'qr-code-outline',
          handler: () => {
            console.log('QR Code clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
