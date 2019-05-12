import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import _ from 'lodash';
import {FireService} from '../shared/fire.service';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy {
  allRef: any;
  loadMoreRef: any;
  all: any = [];

  constructor(private fire: FireService,
              private notifier: NotificationService) { }

  onLoadMore() {

    // this.limit += 4;
    // this.allRef = firebase.database().ref('allposts').limitToFirst(this.limit);
    // this.allRef.on('child_added', data => {
    //   this.all.push({
    //     key: data.key,
    //     data: data.val()
    //   });
    // });

    if (this.all.length > 1 ) {
      const lastLoadedPost = _.last(this.all);
      const lastLoadedPostKey = lastLoadedPost.key;

      this.loadMoreRef = firebase.database().ref('allposts').orderByKey().startAt(lastLoadedPostKey).limitToFirst(12);

      this.loadMoreRef.on('child_added', data => {

        if ( data.key === lastLoadedPostKey ) {
          return;
        } else {
          this.all.push({
            key: data.key,
            data: data.val()
          });
        }
      });
    }
  }
  ngOnInit() {
    this.allRef = firebase.database().ref('allposts').limitToFirst(12);
    this.allRef.on('child_added', data => {
      this.all.push({
        key: data.key,
        data: data.val()
      });
    });
  }



  ngOnDestroy() {
    this.allRef.off();
  }

  onFavouriteClicked(imageData) {
    this.fire.handleFavouriteClicked(imageData)
      .then(data => {
        this.notifier.display('success', 'Images Has been Added to your Favourite');
      })
      .catch(err => {
        this.notifier.display('error', 'Some Thing Wrong Please Try Again Later');
      })
  }

}
