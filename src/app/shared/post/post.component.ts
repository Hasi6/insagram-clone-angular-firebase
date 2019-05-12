import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() imageName: string;
  @Input() displayPostedBy = true;
  @Input() displayFavoritesButton: boolean;
  @Input() displayFollowButton: boolean;

  defaultImage = 'http://via.placeholder.com/200x200';
  imageData: any = {};

  @Output() favouriteClicked = new EventEmitter<any>();
  @Output() followClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    const email = firebase.auth().currentUser.email;
    firebase.database().ref('images').child(this.imageName)
      .once('value')
      .then(snapshot => {
        this.imageData = snapshot.val();
        this.defaultImage = this.imageData.fileUrl;

        if (this.imageData.uploadedBy[1] === email) {
          this.displayFavoritesButton = !this.displayFavoritesButton;
          this.displayFollowButton = !this.displayFollowButton;
        }
      });
  }

  onFavoritesClicked() {
    this.favouriteClicked.emit(this.imageData);
  }

  onFollowClicked() {
    this.followClicked.emit(this.imageData);
  }

}
