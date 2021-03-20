import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  previousRoute: string;

  constructor(
    public photoService: PhotoService
  ) { }

  async ngOnInit() {
    this.previousRoute = localStorage.getItem('previousRoute');
    this.previousRoute = `/${this.previousRoute}`;
    // await this.photoService.loadSaved();
    // await this.photoService.addNewToGallery();
    this.addPhotoToGallery();
  }

  addPhotoToGallery() {
    // this.photoService.addNewToGallery();
  }
}
