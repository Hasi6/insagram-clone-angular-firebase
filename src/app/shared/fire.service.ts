import * as firebase from 'firebase';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import * as Firebase from 'firebase';

@Injectable()
export class FireService {

  constructor(private user: UserService) {
  }

  getUserFromDatabase(uid) {

    const ref = firebase.database().ref('user/' + uid);
    return ref.once('value')
      .then(snapshot => snapshot.val());
  }

  generateRandomName() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for ( let i = 0 ; i < 5 ; i ++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  uploadFile(file) {
    const fileName = this.generateRandomName();
    const fileRef = firebase.storage().ref().child('image/' + fileName);
    const uploadTask = fileRef.put(file);

    return new Promise((resolve, reject) => {

      uploadTask.on('state_changed', snapshot => {

      }, error => {
        reject(error);

      }, () => {
        const fileUrl = uploadTask.snapshot.downloadURL;
        resolve({fileName, fileUrl});
      });

    });

  }

  handleImageUpload(data) {
    const user = firebase.auth().currentUser.uid;

    const newPersonalPostKey = firebase.database().ref().child('myposts').push().key;
    const personalPostDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString()
    };

    const allPostsKey = firebase.database().ref('allposts').push().key;
    const allPostsDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),

      uploadedBy: [firebase.auth().currentUser.uid,
        firebase.auth().currentUser.email,
      ]
    };

    const imageDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      uploadedBy: [firebase.auth().currentUser.uid,
        firebase.auth().currentUser.email,
      ],
      favouriteCount: 0
    };

    const updates = {};
    updates['/myposts/' + user + '/' + newPersonalPostKey ] = personalPostDetails;
    updates['/allposts/' + allPostsKey] = allPostsDetails;
    updates['/images/' + data.fileName] = imageDetails;

    return firebase.database().ref().update(updates);
  }

  getUserPostsRef(uid) {
    return firebase.database().ref('myposts').child(uid);
  }

}
