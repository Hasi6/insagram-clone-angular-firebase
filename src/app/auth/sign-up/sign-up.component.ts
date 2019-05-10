import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import {NotificationService} from '../../shared/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private notifire: NotificationService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const fullname = form.value.fullname;
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {
        userData.sendEmailVerification();
        const message = `A verification email has been sent to ${email} Please check and follow the instructions,
        After Verifi your email please sign in to the application`;
        this.notifire.display('success', message);

        this.router.navigate(['/']);


        return firebase.database().ref('users/' + userData.uid).set({
          email,
          uid: userData.uid,
          registrationDate: new Date().toString(),
          name: fullname
        })
          .then(() => {
            firebase.auth().signOut();
          });

      })
      .catch(err => {
        this.notifire.display('error', err.message);
      });
  }


}
