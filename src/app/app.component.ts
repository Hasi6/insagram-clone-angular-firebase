import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instagram';

ngOnInit() {

  const firebaseConfig = {
    apiKey: 'AIzaSyCoDR1EQC-FAvaV3OD-z68aQ_eIZqBFe88',
    authDomain: 'instagram-36849.firebaseapp.com',
    databaseURL: 'https://instagram-36849.firebaseio.com',
    projectId: 'instagram-36849',
    storageBucket: 'instagram-36849.appspot.com',
    messagingSenderId: '673664078160',
    appId: '1:673664078160:web:16644efd0623bcc2'
  };
  firebase.initializeApp(firebaseConfig);

}



}
