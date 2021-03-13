import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.page.html',
  styleUrls: ['./create-tag.page.scss'],
})
export class CreateTagPage implements OnInit {
  publiclyVisible: boolean;
  previousRoute: string;

  constructor(
    public photoService: PhotoService
  ) { }

  ngOnInit() {
    this.publiclyVisible = true;
    this.previousRoute = localStorage.getItem('previousRoute');
    this.previousRoute = `/${this.previousRoute}`;
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  changeVisibility(val) {
    if (val === false) {
      this.publiclyVisible = false;
    } else if (val === true) {
      this.publiclyVisible = true;
    }
  }
}
