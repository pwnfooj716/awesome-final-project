/* eslint-disable no-console */
const admin = require('firebase-admin');
const firebaseCollections = require('../config/firebaseDBRef');
const followingCollection = firebaseCollections.following;
const followerCollection = firebaseCollections.follower;
const moment = require('moment');
const FieldValue = require('firebase-admin').firestore.FieldValue;


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
  return followingCollection().then((col) => {
    return col.doc(userId).update({
      [`${targetUserId}`]: FieldValue.delete()
    }).then(()=>{
      return followerCollection().then((col) => {
        return col.doc(targetUserId).update({
          [`${userId}`]: FieldValue.delete()
        });
      });
    });
  });
}

module.exports.getFollowerList = async (userId, startIndex=0, limit=20) => {
  console.log(userId)
  return followerCollection().then((col) => {
    return col.doc(userId).then(doc => {
      doc.collection().orderBy('followedTime').startAt(startIndex).limit(limit);
    });
  });
}