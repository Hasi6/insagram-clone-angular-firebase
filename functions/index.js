const functions = require('firebase-functions');

exports.addToFollowing = functions.database.ref('/follow/{initiatorUid}/{interestedInFollowingUid}')
.onCreate(event => {
  const_initiatorUid = event.params.initiatorUid;
  const interestedInFollowingUid = event.params.interestedInFollowingUid;
  const rootRef = event.data.ref.root;
  let FollowingMeRef = rootRef.child('userFollowingMe/' + interestedInFollowingUid + '/' + initiatorUid);
  return FollowingMeRef.set(true);
})
