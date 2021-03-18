import { Component, OnInit } from '@angular/core';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';
import { parseResult, parseResults } from 'src/shared/parseResults';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getStoredUser, storeUser } from 'src/shared/userHelper';

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
    phone: new FormControl(''),
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

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  ngOnInit() {
    this.checkUser();
    this.previousRoute = localStorage.getItem('previousRoute');
    this.previousRoute = `/${this.previousRoute}`;
  }

  checkUser() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    this.userId = getStoredUser().userId;
    query.get(this.userId).then((user) => {
      this.user = parseResult(user);
      this.checkAgent();
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
      console.log(agent);
      if (agent) {
        this.isAgent = true;
      } else {
        this.isAgent = false;
      }
      this.agent = parseResults(agent);
      this.agent = this.agent[0];
      console.log(this.agent);
      this.formCheck();
    }, (error) => {
      console.log(error);
      this.isAgent = false;
      // this.presentUserErrorToast(error);
    });
  }

  formCheck() {
    if (this.isAgent === true) {
      this.displayAgentForm = true;
      this.displayUserForm = false;
      const splitName = this.agent.agentDisplayName.split(' ');
      const agentFirstName = splitName[0];
      const agentLastName = splitName[1];
      this.agentEdit = this.formBuilder.group({
        firstName: agentFirstName,
        lastName: agentLastName,
        phone: this.agent.agentPhoneMain,
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
    } else {
      this.displayAgentForm = false;
      this.displayUserForm = true;
      this.userEdit = this.formBuilder.group({
        firstName: this.user.firstName,
        lastName: this.user.lastName
      });
    }
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
      this.editUser();
    } else {
      this.editUser();
      this.editAgent();
    }
  }

  editUser() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    query.get(this.userId).then((user) => {
      const fullName = `${this.userEdit.value.firstName} ${this.userEdit.value.lastName}`;
      user.set('firstName', this.userEdit.value.firstName);
      user.set('lastName', this.userEdit.value.lastName);
      user.set('fullname', fullName);
      user.set('fullname_lower', fullName.toLowerCase());
      user.save().then((response) => {
        storeUser(response);
        this.user = parseResult(response);
      }).catch((error) => {
        console.error('Error while updating user', error);
      });
    });
  }

  editAgent() {
    const Agents = Parse.Object.extend('Agents');
    const query = new Parse.Query(Agents);
    query.find().then((agent) => {
      const fullName = `${this.userEdit.value.firstName} ${this.userEdit.value.lastName}`;
      agent.set('firstName', this.userEdit.value.firstName);
      agent.set('lastName', this.userEdit.value.lastName);
      agent.set('fullname', fullName);
      agent.set('fullname_lower', fullName.toLowerCase());
      agent.save().then((response) => {
        storeUser(response);
        this.agent = parseResult(response);
      }).catch((error) => {
        console.error('Error while updating user', error);
      });
    });
  }
}
