import * as firebase from 'firebase';

export class FireService {

  getUserFromDatabase(uid) {

    const ref = firebase.database().ref('user/' + uid);
    return ref.once('value')
      .then(snapshot => snapshot.val());
  }
}
