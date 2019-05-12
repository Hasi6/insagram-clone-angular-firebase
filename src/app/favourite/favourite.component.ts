import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import * as firebase from 'firebase';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  favoritesList: any = [];

  constructor() { }

  ngOnInit() {

    const uid = firebase.auth().currentUser.uid;
    const favRef = firebase.database().ref('favourites').child(uid);

    favRef.once('value').then(snapshot => {
      const favouritesObj = snapshot.val();

      this.favoritesList = _.values(favouritesObj);

    });
  }

}
