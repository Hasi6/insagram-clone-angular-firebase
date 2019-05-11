import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import _ from 'lodash';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy {
  allRef: any;
  loadMoreRef: any;
  limit = 4;
  all: any = [];

  constructor() { }
  onLoadMore() {

    this.limit += 4;
    this.allRef = firebase.database().ref('allposts').limitToFirst(this.limit);
    this.allRef.on('child_added', data => {
      this.all.push({
        key: data.key,
        data: data.val()
      });
    });

    // if (this.all.length > 1 ) {
    //   const lastLoadedPost = _.last(this.all);
    //   const lastLoadedPostKey = lastLoadedPost.key;
    //
    //   this.loadMoreRef = firebase.database().ref('allposts').startAt(lastLoadedPostKey, lastLoadedPost).limitToFirst(7);
    //
    //   this.loadMoreRef.on('child_added', data => {
    //
    //     if ( data.key === lastLoadedPostKey ) {
    //       return;
    //     } else {
    //       this.all.push({
    //         key: data.key,
    //         data: data.val()
    //       });
    //     }
    //   });
    // }
  }
  ngOnInit() {
    this.allRef = firebase.database().ref('allposts').limitToFirst(this.limit);
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
}
