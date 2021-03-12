import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() { }

  toggleColorScheme() {
    // Query for the toggle that is used to change between themes
    const toggle = document.querySelector('#themeToggle');

    // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    toggle.addEventListener('ionChange', (ev) => {
      document.body.classList.toggle('dark', ev.detail.checked);
    });
  }

  showDetail(title) {
    console.log(title);
    const nav = document.querySelector('ion-nav');
    console.log(nav);
    nav.push('nav-detail', title);
    console.log(nav);
  }
}
