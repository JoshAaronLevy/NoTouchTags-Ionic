import { Component, OnInit } from '@angular/core';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';
import { parseResult, parseResults } from 'src/shared/parseResults';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getStoredUser, storeUser } from 'src/shared/userHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userId: string;
  isAgent: boolean;
  userEdit: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  agentEdit: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mainPhone: new FormControl(''),
    mobilePhone: new FormControl(''),
    company: new FormControl(''),
    website: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
    facebook: new FormControl(''),
    linkedIn: new FormControl(''),
    aboutMe: new FormControl('')
  });
  previousRoute: string;
  user: any;
  username: string;
  agent: any;
  displayAgentForm: boolean;
  displayUserForm: boolean;
  firstName: any;
  lastName: any;

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    public router: Router
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    this.checkUser();
    if (localStorage.getItem('isAgent') === 'YES') {
      this.isAgent = true;
    } else {
      this.isAgent = false;
    }
    this.previousRoute = localStorage.getItem('previousRoute');
    this.previousRoute = `/${this.previousRoute}`;
  }

  checkUser() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    this.userId = getStoredUser().userId;
    query.get(this.userId).then((user) => {
      this.user = parseResult(user);
      if (this.isAgent === true) {
        this.checkAgent();
      } else {
        this.userForm();
      }
    }, (error) => {
      this.presentUserErrorToast(error);
    });
  }

  checkAgent() {
    const Agents = Parse.Object.extend('Agents');
    const query = new Parse.Query(Agents);
    this.username = getStoredUser().username;
    query.equalTo('agentID', this.username);
    query.find().then((agent) => {
      if (agent.length > 0) {
        this.agent = parseResults(agent);
        this.agent = this.agent[0];
        localStorage.setItem('agentId', this.agent.id);
        this.agentForm();
      } else {
        this.isAgent = false;
      }
    }, (error) => {
      this.isAgent = false;
      return error;
      // this.presentUserErrorToast(error);
    });
  }

  agentForm() {
    this.displayAgentForm = true;
    this.displayUserForm = false;
    const splitName = this.agent.agentDisplayName.split(' ');
    const agentFirstName = splitName[0];
    const agentLastName = splitName[1];
    this.agentEdit = this.formBuilder.group({
      firstName: agentFirstName,
      lastName: agentLastName,
      mainPhone: this.agent.agentPhoneMain,
      mobilePhone: this.agent.agentPhoneMobile,
      company: this.agent.agentOfficeName,
      website: this.agent.website,
      address1: this.agent.agentAddress,
      address2: this.agent.agentAddress2,
      city: this.agent.agentCity,
      state: this.agent.agentState,
      zip: this.agent.agentZip,
      facebook: this.agent.facebook,
      linkedIn: this.agent.linkedIn,
      aboutMe: this.agent.agentAboutMe
    });
  }

  userForm() {
    this.displayAgentForm = false;
    this.displayUserForm = true;
    this.userEdit = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName
    });
  }

  async presentUserErrorToast(error) {
    const toast = await this.toastController.create({
      message: error,
      position: 'top',
      color: 'danger',
      duration: 5000
    });
    toast.present();
  }

  editProfile() {
    if (this.isAgent === false) {
      this.firstName = this.userEdit.value.firstName;
      this.lastName = this.userEdit.value.lastName;
      this.editUser();
    } else {
      this.firstName = this.agentEdit.value.firstName;
      this.lastName = this.agentEdit.value.lastName;
      this.editUser();
      this.editAgent();
    }
  }

  editUser() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    query.get(this.userId).then((user) => {
      const fullName = `${this.firstName} ${this.lastName}`;
      user.set('firstName', this.firstName);
      user.set('lastName', this.lastName);
      user.set('fullname', fullName);
      user.set('fullname_lower', fullName.toLowerCase());
      user.save().then((response) => {
        storeUser(response);
        this.user = parseResult(response);
      }).catch((error) => {
        this.presentUserErrorToast(error);
      });
    });
  }

  editAgent() {
    const Agents = Parse.Object.extend('Agents');
    const query = new Parse.Query(Agents);
    const agentId = localStorage.getItem('agentId');
    query.get(agentId).then((agent) => {
      const fullName = `${this.firstName} ${this.lastName}`;
      agent.set('firstName', this.firstName);
      agent.set('lastName', this.lastName);
      agent.set('agentDisplayName', fullName);
      agent.set('agentPhoneMain', this.agentEdit.value.mainPhone);
      agent.set('agentPhoneMobile', this.agentEdit.value.mobilePhone);
      agent.set('agentOfficeName', this.agentEdit.value.company);
      agent.set('website', this.agentEdit.value.website);
      agent.set('agentAddress', this.agentEdit.value.address1);
      agent.set('agentAddress2', this.agentEdit.value.address2);
      agent.set('agentCity', this.agentEdit.value.city);
      agent.set('agentState', this.agentEdit.value.state);
      agent.set('agentZip', this.agentEdit.value.zip);
      agent.set('faceBook', this.agentEdit.value.facebook);
      agent.set('linkedIn', this.agentEdit.value.linkedIn);
      agent.set('agentAboutMe', this.agentEdit.value.aboutMe);
      agent.save().then((response) => {
        this.presentUserSuccessToast();
        // this.router.navigate(['/settings']);
        return response;
      }).catch((error) => {
        this.presentUserErrorToast(error);
      });
    });
  }

  async presentUserSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Updated successfully!',
      position: 'top',
      color: 'success',
      duration: 4000
    });
    toast.present();
  }
}
