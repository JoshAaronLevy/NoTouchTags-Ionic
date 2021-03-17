import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tags } from 'src/app/models/tag.model';
import { TagsService } from 'src/app/services/tags.service';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';
import { ActionSheetController } from '@ionic/angular';
import { parseResults } from 'src/shared/parseResults';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  providers: [
    TagsService
  ]
})
export class ListPage implements OnInit {
  tags: Tags[];
  selectedTag: any;
  serverBaseUrl: string;
  loading: boolean;
  searchEnabled: boolean;
  skeletonItems: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  ];

  constructor(
    public router: Router,
    public tagService: TagsService,
    public actionSheetController: ActionSheetController
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    this.searchEnabled = false;
    this.loading = true;
    const Tags = Parse.Object.extend('Tags');
    const query = new Parse.Query(Tags);
    query.find().then((results) => {
      results = parseResults(results);
      this.tags = results;
      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].imageUrl = '';
        if (this.tags[i].tagPhotoRef === undefined) {
          this.tags[i].imageUrl = `https://photos.homecards.com/rebeacons/Tag-12345-1.jpg`;
        } else {
          this.tags[i].imageUrl = `https://photos.homecards.com/rebeacons/Tag-${this.tags[i].tagPhotoRef}-1.jpg`;
        }
      }
      setTimeout(() => {
        this.loading = false;
      }, 500);
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

  enableSearch() {
    this.searchEnabled = true;
  }

  routeToTagDetails(selectedTag) {
    this.selectedTag = selectedTag;
    console.log(this.selectedTag);
  }

  favoriteTag(selectedTag) {
    console.log(selectedTag);
  }

  removeTag(selectedTag) {
    console.log(selectedTag);
  }
}
