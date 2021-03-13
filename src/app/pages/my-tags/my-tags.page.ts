import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tags } from 'src/app/models/tag.model';
import { TagsService } from 'src/app/services/tags.service';

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

  constructor(
    public router: Router,
    public tagService: TagsService
  ) { }

  ngOnInit() {
    this.searchEnabled = false;
    this.loading = true;
    this.tagService.getAllTags().subscribe(data => {
      this.tags = data;
      this.tags.forEach((a) => {
        a.imageUrl = '';
      });
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i].tagPhotoRef === undefined) {
          this.tags[i].tagPhotoRef = '12345';
        }
        this.tags[i].imageUrl = `https://photos.homecards.com/rebeacons/Tag-${this.tags[i].tagPhotoRef}-1.jpg`;
      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
    console.log(this.router.getCurrentNavigation());
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
