import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  previousRoute: string;

  constructor() { }

  ngOnInit() {
    this.previousRoute = localStorage.getItem('previousRoute');
    this.previousRoute = `/${this.previousRoute}`;
  }
}
