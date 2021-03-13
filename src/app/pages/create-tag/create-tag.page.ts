import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { PhotoService } from 'src/app/services/photo.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.page.html',
  styleUrls: ['./create-tag.page.scss'],
  providers: [
    Keyboard,
    FileChooser,
    Chooser
  ]
})
export class CreateTagPage implements OnInit {
  publiclyVisible: boolean;
  previousRoute: string;

  constructor(
    public photoService: PhotoService,
    public router: Router,
    public actionSheetController: ActionSheetController,
    private keyboard: Keyboard,
    private fileChooser: FileChooser,
    private chooser: Chooser
  ) { }

  ngOnInit() {
    this.publiclyVisible = true;
    this.previousRoute = localStorage.getItem('previousRoute');
    this.previousRoute = `/${this.previousRoute}`;
  }

  async takePhoto() {
    await this.photoService.addNewToGallery();
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
}
