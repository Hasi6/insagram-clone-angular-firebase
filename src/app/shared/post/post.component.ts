import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() imageName: string;
  @Input() displayPostedBy = false;
  @Input() displayFavoritesButton: true;

  defaultImage = 'http://via.placeholder.com/200x200';
  imageData: any = {};

  @Output() favouriteClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

    firebase.database().ref('images').child(this.imageName)
      .once('value')
      .then(snapshot => {
        this.imageData = snapshot.val();
        this.defaultImage = this.imageData.fileUrl;
      });
  }

  onFavoritesClicked() {
    this.favouriteClicked.emit(this.imageData);
  }

}
