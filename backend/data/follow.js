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

function getPageList(objList, startIndex, limit) {
  objList.sort((a, b) => {
    let v1 = a.followedTime._seconds;
    let v2 = b.followedTime._seconds;
    if (v1 < v2){
      return -1;
    }
    if (v1 > v2){
      return 1;
    }
    return 0;
  });
  objList.splice(0, startIndex);
  objList.splice(startIndex + limit, objList.length);
  return objList;
}

module.exports.getFollowerList = async (userId, startIndex=0, limit=20) => {
  return followerCollection().then((col) => {
    return col.doc(userId).get().then((doc) => {
      if (!doc.exists) return [];
      let dataObj = doc.data();
      let allFollower = Object.values(dataObj);
      return getPageList(allFollower, startIndex, limit);
    });
  });
}

module.exports.getFollowingList = async (userId, startIndex=0, limit=20) => {
  return followingCollection().then((col) => {
    return col.doc(userId).get().then((doc) => {
      if (!doc.exists) return [];
      let dataObj = doc.data();
      let allFollower = Object.values(dataObj);
      return getPageList(allFollower, startIndex, limit);
    });
  });
}

module.exports.getFollowerNum = async (userId) => {
  return followerCollection().then((col) => {
    return col.doc(userId).get().then((doc) => {
      if (!doc.exists) return 0;
      let dataObj = doc.data();
      let allFollower = Object.values(dataObj);
      return allFollower.length;
    });
  });
}

module.exports.getFollowingNum = async (userId) => {
  return followingCollection().then((col) => {
    return col.doc(userId).get().then((doc) => {
      if (!doc.exists) return 0;
      let dataObj = doc.data();
      let allFollower = Object.values(dataObj);
      return allFollower.length;
    });
  });
}