import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  theme: string;

  constructor() { }

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
}
