import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tags } from 'src/app/models/tag.model';
import { TagsService } from 'src/app/services/tags.service';
import { parseResults } from 'src/shared/parseResults';
import { getStoredUser } from 'src/shared/userHelper';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';
import { storeTag } from 'src/shared/tagHelper';

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
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];
  username: string;
  previousRoute: string;

  constructor(
    public router: Router,
    public tagService: TagsService
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    this.username = getStoredUser().username;
    if (localStorage.getItem('previousRoute') === 'my-tags') {
      localStorage.setItem('previousRoute', 'settings');
      this.previousRoute = 'settings';
    }
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

  routeToTags() {
    this.router.navigate(['/tags']);
  }

  routeToScan() {
    this.router.navigate(['/scan-nfc-tag']);
  }

  routeToSettings() {
    this.router.navigate(['/settings']);
  }

  routeToTagDetails(selectedTag) {
    this.selectedTag = selectedTag;
    localStorage.setItem('previousRoute', 'my-tags');
    localStorage.setItem('selectedTagId', this.selectedTag.id);
    this.router.navigate(['/tag-details']);
  }

  routeToCreateTag() {
    localStorage.removeItem('previousRoute');
    localStorage.setItem('previousRoute', 'profile');
    localStorage.setItem('method', 'create');
    localStorage.setItem('previousRoute', 'my-tags');
    this.router.navigate(['/create-tag']);
  }

  routeToEditTag(selectedTag) {
    this.selectedTag = selectedTag;
    storeTag(this.selectedTag);
    localStorage.setItem('tagId', this.selectedTag.id);
    localStorage.setItem('method', 'edit');
    localStorage.setItem('previousRoute', 'my-tags');
    this.router.navigate(['/create-tag']);
  }

  favoriteTag(selectedTag) {
    console.log(selectedTag);
  }

  removeTag(selectedTag) {
    console.log(selectedTag);
  }
}
