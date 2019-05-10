import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NotificationService} from '../../shared/notification.service';
import * as firebase from 'firebase';
import {FireService} from '../../shared/fire.service';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {

  constructor(private notifier: NotificationService,
              private fire: FireService,
              private userService: UserService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userData => {
        if (userData.emailVerified) {
            return this.fire.getUserFromDatabase(userData.uid);
        } else {
          const message = 'Your Email is not yet Verified';
          this.notifier.display('error', message);

          firebase.auth().signOut();
        }

      })
      .then(userDataFromDatabase => {
        if (userDataFromDatabase) {
          this.userService.set(userDataFromDatabase);
        }
        this.router.navigate(['/allposts']);
      })
      .catch( err => {
          this.notifier.display('error', err.message);
      });
  }

}
