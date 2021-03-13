import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  theme: string;

  constructor(
    private platform: Platform,
    public router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public actionSheetController: ActionSheetController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.theme = localStorage.getItem('theme');
    if (this.theme === 'dark') {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
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
          text: 'Scan NFC Tag',
          icon: 'albums-outline',
          handler: () => {
            console.log('NFC Tag clicked');
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
}
