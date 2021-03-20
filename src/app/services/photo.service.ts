import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post(photoUrl, params).subscribe(res => {
      console.log(res);
    });
  }

  requestAccess() {
    Camera.requestPermissions().then((response) => {
      console.log(response);
    });
  }

  // async addNewToGallery(id) {
  //   this.uniqueId = id;
  //   const capturedPhoto = await Camera.getPhoto({
  //     resultType: CameraResultType.Uri,
  //     source: CameraSource.Camera,
  //     quality: 100
  //   });
  //   const savedImageFile = await this.savePicture(capturedPhoto, id);
  //   this.photos.unshift(savedImageFile);

  //   this.photos.unshift({
  //     filepath: 'soon...',
  //     webviewPath: capturedPhoto.webPath
  //   });

  //   Storage.set({
  //     key: this.PHOTO_STORAGE,
  //     value: JSON.stringify(this.photos)
  //   });
  // }

  // async savePicture(cameraPhoto: CameraPhoto, id) {
  //   const base64Data = await this.readAsBase64(cameraPhoto);
  //   const fileName = id + '.jpg';
  //   const savedFile = await Filesystem.writeFile({
  //     path: fileName,
  //     data: base64Data,
  //     directory: FilesystemDirectory.Data
  //   });
  //   if (this.platform.is('hybrid')) {
  //     return {
  //       filepath: savedFile.uri,
  //       webviewPath: Capacitor.convertFileSrc(savedFile.uri),
  //     };
  //   } else {
  //     console.log(fileName);
  //     this.uploadParams = {
  //       filepath: fileName,
  //       webviewPath: cameraPhoto.webPath
  //     };
  //     this.photo = cameraPhoto;
  //     return this.uploadParams;
  //   }
  // }

  // async readAsBase64(cameraPhoto: CameraPhoto) {
  //   console.log('Read as base64');
  //   if (this.platform.is('hybrid')) {
  //     const file = await Filesystem.readFile({
  //       path: cameraPhoto.path
  //     });
  //     return file.data;
  //   } else {
  //     const response = await fetch(cameraPhoto.webPath);
  //     const blob = await response.blob();
  //     return await this.convertBlobToBase64(blob) as string;
  //   }
  // }

  // convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  //   console.log('Convert blob to base64');
  //   const reader = new FileReader();
  //   reader.onerror = reject;
  //   reader.onload = () => {
  //     resolve(reader.result);
  //   };
  //   reader.readAsDataURL(blob);
  // })

  // async loadSaved() {
  //   console.log('Load saved');
  //   const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
  //   this.photos = JSON.parse(photoList.value) || [];
  //   if (!this.platform.is('hybrid')) {
  //     for (let photo of this.photos) {
  //       const readFile = await Filesystem.readFile({
  //         path: photo.filepath,
  //         directory: FilesystemDirectory.Data
  //       });
  //       photo.webviewPath = `data:image/jpg;base64,${readFile.data}`;
  //     }
  //   }
  // }
}
