import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { parseResults } from 'src/shared/parseResults';
import { getStoredTag } from 'src/shared/tagHelper';
import { v4 as uuid } from 'uuid';
import { Plugins, CameraResultType } from '@capacitor/core';
import { profile } from 'console';

const { Camera } = Plugins;

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.page.html',
  styleUrls: ['./create-tag.page.scss'],
  providers: [
    FileChooser,
    Chooser
  ]
})
export class CreateTagPage implements OnInit {
  publiclyVisible: boolean;
  previousRoute: string;
  tagEdit: FormGroup = new FormGroup({
    tagTitle: new FormControl(''),
    tagSubTitle: new FormControl(''),
    tagCompany: new FormControl(''),
    tagPrice: new FormControl(''),
    tagUrl: new FormControl(''),
    tagAddress1: new FormControl(''),
    tagAddress2: new FormControl(''),
    tagCity: new FormControl(''),
    tagState: new FormControl(''),
    tagZip: new FormControl(''),
    tagInfo: new FormControl('')
  });
  tagId: string;
  tag: any;
  method: string;
  loading: boolean;
  uniqueId: string;
  picture: string;

  constructor(
    private formBuilder: FormBuilder,
    public photoService: PhotoService,
    public router: Router,
    public actionSheetController: ActionSheetController,
    private fileChooser: FileChooser,
    private chooser: Chooser,
    public toastController: ToastController
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    this.loading = true;
    if (localStorage.getItem('method') === 'create') {
      this.method = 'create';
    } else {
      this.method = 'edit';
    }
    this.publiclyVisible = true;
    this.previousRoute = localStorage.getItem('previousRoute');
    this.previousRoute = `/${this.previousRoute}`;
    if (this.method === 'edit') {
      this.tagId = getStoredTag().id;
      this.uniqueId = this.tagId;
      this.buildEditForm();
    } else {
      this.uniqueId = uuid().toString();
      this.buildCreateForm();
    }
  }

  buildEditForm() {
    const Tags = Parse.Object.extend('Tags');
    const query = new Parse.Query(Tags);
    query.equalTo('objectId', this.tagId);
    query.find().then((tag) => {
      this.tag = parseResults(tag);
      this.tag = this.tag[0];
      this.tagEdit = this.formBuilder.group({
        tagTitle: this.tag.tagTitle,
        tagSubTitle: this.tag.tagSubTitle,
        tagCompany: this.tag.tagCompany,
        tagPrice: this.tag.tagPrice,
        tagUrl: this.tag.tagUrl,
        tagAddress1: this.tag.tagAddress1,
        tagAddress2: this.tag.tagAddress2,
        tagCity: this.tag.tagCity,
        tagState: this.tag.tagState,
        tagZip: this.tag.tagZip,
        tagInfo: this.tag.tagInfo
      });
      this.tag.imageUrl = `https://photos.homecards.com/rebeacons/Tag-${this.tag.tagPhotoRef}-1.jpg`;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      return this.presentTagErrorToast(error);
    });
  }

  buildCreateForm() {
    this.tagEdit = this.formBuilder.group({
      tagTitle: '',
      tagSubTitle: '',
      tagCompany: '',
      tagPrice: '',
      tagUrl: '',
      tagAddress1: '',
      tagAddress2: '',
      tagCity: '',
      tagState: '',
      tagZip: '',
      tagInfo: ''
    });
    this.loading = false;
  }

  requestAccess() {
    this.photoService.requestAccess();
  }

  async takePicture() {
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        width: 800,
        height: 800
      });
      profilePicture.format = 'jpeg';
      this.picture = profilePicture.base64String;
      console.log(profilePicture);
      this.photoService.create(profilePicture);
    } catch (error) {
      return this.presentPhotoErrorToast(error);
    }
  }

  choosePhoto() {
    // this.fileChooser.open()
    //   .then(uri => console.log(uri))
    //   .catch(e => console.log(e));
    this.chooser.getFile()
      .then(file => console.log(file ? file.name : 'canceled'))
      .catch((error: any) => console.error(error));
  }

  changeVisibility(val) {
    if (val === false) {
      this.publiclyVisible = false;
    } else if (val === true) {
      this.publiclyVisible = true;
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Add Tag Photos',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera-outline',
          handler: () => {
            // this.requestAccess();
            this.takePicture();
          }
        }, {
          text: 'Photo Library',
          icon: 'albums-outline',
          handler: () => {
            this.choosePhoto();
          }
        }
      ]
    });
    await actionSheet.present();
  }

  editTag() {
    const Tags = Parse.Object.extend('Tags');
    const query = new Parse.Query(Tags);
    query.get(this.tagId).then((tag) => {
      tag.set('tagTitle', this.tagEdit.value.tagTitle);
      tag.set('tagSubTitle', this.tagEdit.value.tagSubTitle);
      tag.set('tagCompany', this.tagEdit.value.tagCompany);
      tag.set('tagPrice', this.tagEdit.value.tagPrice);
      tag.set('tagUrl', this.tagEdit.value.tagUrl);
      tag.set('tagAddress1', this.tagEdit.value.tagAddress1);
      tag.set('tagAddress2', this.tagEdit.value.tagAddress2);
      tag.set('tagCity', this.tagEdit.value.tagCity);
      tag.set('tagState', this.tagEdit.value.tagState);
      tag.set('tagZip', this.tagEdit.value.tagZip);
      tag.set('tagInfo', this.tagEdit.value.tagInfo);
      tag.save().then((response) => {
        this.presentTagSuccessToast();
        // this.router.navigate(['/settings']);
        return response;
      }).catch((error) => {
        this.presentTagErrorToast(error);
      });
    });
  }

  async presentTagSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Updated successfully!',
      position: 'top',
      color: 'success',
      duration: 4000
    });
    toast.present();
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

  async presentPhotoErrorToast(error) {
    const toast = await this.toastController.create({
      message: error,
      position: 'top',
      color: 'danger',
      duration: 5000
    });
    toast.present();
  }
}
