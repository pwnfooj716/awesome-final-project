/* eslint-disable no-console */
const admin = require('firebase-admin');
const firebaseCollections = require('../config/firebaseDBRef');
const followingCollection = firebaseCollections.following;
const followerCollection = firebaseCollections.follower;
const moment = require('moment');

module.exports.follow = async (userId, targetUserId) => {
  let followedTime = admin.firestore.Timestamp.fromMillis(moment().format('x'));
  var followingObj = {
    userId: targetUserId,
    followedTime: followedTime
  };

  return followingCollection().then((col) => {
    return col.doc(userId).set({
      [`${targetUserId}`]: followingObj
    }, {merge: true}).then(()=>{
      var followerObj = {
        userId: userId,
        followedTime: followedTime
      };
      return followerCollection().then((col) => {
        return col.doc(targetUserId).set({
          [`${userId}`]: followerObj
        }, {merge: true});
      });
    });
  });
}

module.exports.unfollow = async (userId, targetUserId) => {
  return followCollection().then((col) => {
    return col.collection(userId).doc(targetUserId).delete().catch((err) => {
      console.log('Error getting documents', err);
      return false;
    })
  })
}

module.exports.getFollowerList = async (userId) => {
  return followCollection().then((col) => {
    return col.collection(userId).doc(targetUserId).delete().catch((err) => {
      console.log('Error getting documents', err);
      return false;
    })
  })
}