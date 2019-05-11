import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from '../shared/user.service';
import {Route, Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  name: string;
  email: string;
  uid: any;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {

    this.userService.statusChange.subscribe(userData => {
      if (userData) {
        this.name = firebase.auth().currentUser.displayName;
        this.email = firebase.auth().currentUser.email;
        this.uid = firebase.auth().currentUser.uid;
      } else {
        this.name = firebase.auth().currentUser.displayName;
        this.email = firebase.auth().currentUser.email;
        this.uid = firebase.auth().currentUser.uid;
      }
  });


    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
        this.isLoggedIn = true;
        const user = this.userService.getProfile();
        if (user && user.name) {
          this.name = firebase.auth().currentUser.displayName;
          this.email = firebase.auth().currentUser.email;
          this.uid = firebase.auth().currentUser.uid;
        }
        this.router.navigate(['/myposts']);
      } else {
          this.isLoggedIn = false;
      }
    });
  }

  onLogout() {
    firebase.auth().signOut()
      .then(() => {
        this.userService.destroy();
        this.isLoggedIn = false;
      });
  }

}
