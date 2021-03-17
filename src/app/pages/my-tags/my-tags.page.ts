import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tags } from 'src/app/models/tag.model';
import { TagsService } from 'src/app/services/tags.service';
import { parseResults } from 'src/shared/parseResults';
import { getStoredUser } from 'src/shared/userHelper';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';

@Component({
  selector: 'app-my-tags',
  templateUrl: './my-tags.page.html',
  styleUrls: ['./my-tags.page.scss'],
  providers: [
    TagsService
  ]
})
export class MyTagsPage implements OnInit {
  tags: Tags[];
  selectedTag: any;
  serverBaseUrl: string;
  loading: boolean;
  searchEnabled: boolean;
  skeletonItems: any[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  ];
  username: string;

  constructor(
    public router: Router,
    public tagService: TagsService
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    this.username = getStoredUser().username;
    this.searchEnabled = false;
    this.loading = true;
    const Tags = Parse.Object.extend('Tags');
    const query = new Parse.Query(Tags);
    query.equalTo('userEmail', this.username);
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
