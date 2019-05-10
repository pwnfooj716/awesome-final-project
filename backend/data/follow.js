/* eslint-disable no-console */
const admin = require('firebase-admin');
const firebaseCollections = require('../config/firebaseDBRef');
const followCollection = firebaseCollections.follow;
const moment = require('moment');

module.exports.follow = async (userId, targetUserId) => {
  var dataObj = {
    userId: targetUserId,
    followedTime: admin.firestore.Timestamp.fromMillis(moment().format('x'))
  };

  return followCollection().then((col) => {
    return col.doc(userId).set(dataObj).then(() => {
      console.log(dataObj, `${userId} follow ${targetUserId} success.`);
      return dataObj;
    })
  }).catch((err) => {
    console.log('Error getting documents', err);
    return false;
  })
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