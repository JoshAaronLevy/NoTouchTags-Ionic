import { Component, OnInit } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';
import { parseResults } from 'src/shared/parseResults';
import { ToastController } from '@ionic/angular';
import { getStoredUser } from 'src/shared/userHelper';
import { storeTag } from 'src/shared/tagHelper';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.html',
  styleUrls: ['./tag-details.scss'],
  providers: [
    InAppBrowser
  ]
})
export class TagDetailsPage implements OnInit {
  selectedTagId: any;
  selectedTag: any;
  images: any = [];
  previousRoute: string;
  loading: boolean;

  slideOpts = {
    spaceBetween: 10,
    slidesPerView: 'auto',
    centeredSlides: true,
    initialSlide: 0,
    speed: 500
  };
  username: any;
  editEnabled: boolean;
  browser: any;

  constructor(
    public router: Router,
    private iab: InAppBrowser,
    public toastController: ToastController
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    this.loading = true;
    this.username = getStoredUser().username;
    this.selectedTagId = localStorage.getItem('selectedTagId');
    this.previousRoute = localStorage.getItem('previousRoute');
    // this.previousRoute = `/${this.previousRoute}`;
    this.getTagDetails();
  }

  getTagDetails() {
    const Tags = Parse.Object.extend('Tags');
    const query = new Parse.Query(Tags);
    query.equalTo('objectId', this.selectedTagId);
    query.find().then((tag) => {
      if (tag.length > 0) {
        this.selectedTag = parseResults(tag);
        this.selectedTag = this.selectedTag[0];
        this.selectedTag.imageUrl = `https://photos.homecards.com/rebeacons/Tag-${this.selectedTag.tagPhotoRef}-1.jpg`;
        this.images.push(
          {
            url: this.selectedTag.imageUrl
          }
        );
        if (this.selectedTag.tagPrice.startsWith('#') === true) {
          this.selectedTag.tagPrice = this.selectedTag.tagPrice.slice(1);
        }
        if (this.selectedTag.userEmail === this.username) {
          this.editEnabled = true;
        } else {
          this.editEnabled = false;
        }
        this.loading = false;
      } else {
        const error = 'Unable to retrieve tag details. Please try again.';
        this.presentTagErrorToast(error);
      }
    }, (error) => {
      this.presentTagErrorToast(error);
      return error;
    });
  }

  viewTagUrl(tag) {
    const browser = this.iab.create(tag.tagUrl, '_self', { fullscreen: 'no' });
  }

  async presentTagErrorToast(error) {
    const toast = await this.toastController.create({
      message: error,
      position: 'top',
      color: 'danger',
      duration: 5000
    });
    toast.present();
  }

  routeToEditTag() {
    storeTag(this.selectedTag);
    localStorage.setItem('tagId', this.selectedTag.id);
    localStorage.setItem('method', 'edit');
    localStorage.setItem('previousRoute', 'tag-details');
    this.router.navigate(['/create-tag']);
  }

  routeToTags() {
    this.router.navigate(['/tags']);
  }

  routeToScan() {
    this.router.navigate(['/scan-nfc-tag']);
  }

  routeToSettings() {
    this.router.navigate(['/settings']);
  }

}
