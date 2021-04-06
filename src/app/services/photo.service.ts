import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const { Camera, Filesystem, Storage } = Plugins;

const photoUrl = environment.photoUrl;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photo: any;
  photos: any = [];
  uniqueId: string;
  // tslint:disable-next-line: no-inferrable-types
  PHOTO_STORAGE: string = 'photos';
  platform: Platform;
  uploadParams: { filepath: string; webviewPath: string; };

  constructor(
    platform: Platform,
    private http: HttpClient
  ) {
    this.platform = platform;
  }

  create(params: any) {
    return this.http.post(photoUrl, params).subscribe(response => {
      console.log(response);
      return response;
    });
  }

  requestAccess() {
    Camera.requestPermissions().then((response) => {
      return response;
    });
  }

  async addNewToGallery(id) {
    this.uniqueId = id;
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      width: 375,
      height: 360,
      quality: 100,
      saveToGallery: true
    });
    console.log(capturedPhoto);
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);
    console.log(savedImageFile);

    // this.photos.unshift({
    //   filepath: '',
    //   webviewPath: capturedPhoto.webPath
    // });
    // console.log(this.photos);

    // Storage.set({
    //   key: this.PHOTO_STORAGE,
    //   value: JSON.stringify(this.photos)
    // });
  }

  async savePicture(cameraPhoto: CameraPhoto) {
    console.log(cameraPhoto);
    const fileName = `Tag-${this.uniqueId}-1.jpg`;
    const base64Data = await this.readAsBase64(cameraPhoto, fileName);
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
    console.log(savedFile);
    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      this.uploadParams = {
        filepath: fileName,
        // webviewPath: cameraPhoto.webPath,
        webviewPath: fileName
      };
      this.photo = cameraPhoto;
      console.log(this.photo);
      console.log(this.uploadParams);
      return this.sendPostRequest();
    }
  }

  async readAsBase64(cameraPhoto: CameraPhoto, fileName) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });
      return file.data;
    } else {
      const response = await fetch(fileName);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

  async loadSaved() {
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];
    if (!this.platform.is('hybrid')) {
      for (const photo of this.photos) {
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.Data
        });
        photo.webviewPath = `data:image/jpg;base64,${readFile.data}`;
      }
    }
  }

  sendPostRequest() {
    const fullFileName = `Tag-${this.uniqueId}-1.jpg`;
    const url = 'https://photos.homecards.com/admin/uploads/app/';
    const headers = new HttpHeaders()
      .set('x-token', this.uniqueId);
    const body = {
      fileName: fullFileName,
      mimeType: 'multipart/form-data'
    };
    return this.http
      .post(url, { file: body }, { headers })
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }
}
