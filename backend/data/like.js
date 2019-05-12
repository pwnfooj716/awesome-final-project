/* eslint-disable no-console */
const admin = require('firebase-admin');
const firebaseCollections = require('../config/firebaseDBRef')
const likeCollection = firebaseCollections.like
const moment = require('moment');
const uuidv4 = require('uuid/v4');

// Like will store all the like behavior about a user. 
// For data, user like a post or a comment is the same.
module.exports.like = async (userId, targetId) => {
  let createTime = admin.firestore.Timestamp.fromMillis(moment().format('x'));
  let likeId = uuidv4();
  var likeObj = {
    likeId: likeId,
    userId: userId,
    targetId: targetId,
    createTime: createTime
  };

  return likeCollection().then((col) => {
    return col.doc(likeId).set(likeObj).then(()=>{
      return likeObj;
    });
  });
}

module.exports.unlike = async (userId, targetId) => {
  return likeCollection().then((col) => {
    return col.where('targetId', '==', targetId)
      .where('userId', '==', userId)
      .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
  });
}

module.exports.getLikeStatus = async (userId, targetId) => {
  return likeCollection().then((col) => {
    return col.where('targetId', '==', targetId)
      .where('userId', '==', userId)
      .get().then((snap) => {
        let resData = null;
        snap.forEach(function(doc) {
          console.log(doc.data(), "cson");
          resData = doc.data();
        });
        return resData;
    });
  });
}