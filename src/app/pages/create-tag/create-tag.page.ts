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

  constructor(
    private formBuilder: FormBuilder,
    public photoService: PhotoService,
    public router: Router,
    public actionSheetController: ActionSheetController,
    private fileChooser: FileChooser,
    public toastController: ToastController
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    this.publiclyVisible = true;
    this.previousRoute = localStorage.getItem('previousRoute');
    this.previousRoute = `/${this.previousRoute}`;
    this.tagId = getStoredTag().id;
    this.buildForm();
  }

  buildForm() {
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
    }, (error) => {
      return this.presentTagErrorToast(error);
    });
  }

  async takePhoto() {
    await this.photoService.addNewToGallery();
  }

  choosePhoto() {
    this.fileChooser.open()
      .then(uri => console.log(uri))
      .catch(e => console.log(e));
    // this.chooser.getFile()
    //   .then(file => console.log(file ? file.name : 'canceled'))
    //   .catch((error: any) => console.error(error));
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
            this.takePhoto();
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
}
