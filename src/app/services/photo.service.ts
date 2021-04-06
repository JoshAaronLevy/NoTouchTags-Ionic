import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource,
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const { Camera, Filesystem, Storage } = Plugins;
const photoUrl = environment.photoUrl;
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photo: any;
  photos: any = [];
  uniqueId: string;
  PHOTO_STORAGE: string = 'photos';
  platform: Platform;
  uploadParams: { filepath: string; webviewPath: string };

  constructor(platform: Platform, private http: HttpClient) {
    this.platform = platform;
  }

  create(params: any) {
    return this.http.post(photoUrl, params).subscribe((response) => {
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
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      width: 375,
      height: 360,
      quality: 100,
      saveToGallery: true,
    });
    console.log(capturedPhoto);
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);
    console.log(savedImageFile);
  }

  async readAsBase64(cameraPhoto: CameraPhoto, fileName) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });
      return file.data;
    } else {
      const response = await fetch(fileName);
      const blob = await response.blob();
      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  async loadSaved() {
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];
    if (!this.platform.is('hybrid')) {
      for (const photo of this.photos) {
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.Data,
        });
        photo.webviewPath = `data:image/jpg;base64,${readFile.data}`;
      }
    }
  }

  async savePicture(cameraPhoto: CameraPhoto) {
    console.log(cameraPhoto);
    const file = this.dataUriToFile(cameraPhoto.dataUrl, `Tag-${this.uniqueId}-1.jpg`)
    return await this.sendPostRequest(file);
  }

  sendPostRequest(file: File) {
    const url = 'https://photos.homecards.com/admin/uploads/app/';
    const headers = new HttpHeaders({
      'x-token': this.uniqueId,
    });
    const payload = new FormData();
    payload.append('file', file);
    return this.http.post(url, payload, { headers }).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  dataUriToFile(dataUri: string, filename: string) {
    console.log(dataUri);
    console.log(filename);
    const [mimeInfo, base64] = dataUri.split(',');
    const mime = mimeInfo.match(/:(.*?);/)[1];
    const bstr = atob(base64);
    let n = bstr.length;
    const bits = new Uint8Array(n);
    while (n--) {
      bits[n] = bstr.charCodeAt(n);
    }
    return new File([bits], filename, { type: mime });
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    })
}
