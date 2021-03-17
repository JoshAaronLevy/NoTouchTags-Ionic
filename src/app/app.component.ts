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
  username: string;
  tabsVisible: boolean;
  theme: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public actionSheetController: ActionSheetController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    if (this.username != null || this.username !== undefined) {
      this.tabsVisible = true;
    } else {
      this.tabsVisible = false;
    }
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
}
