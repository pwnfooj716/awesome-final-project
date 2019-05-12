/* eslint-disable no-console */
const uuidv4 = require('uuid/v4');
const admin = require('firebase-admin');
const firebaseCollections = require('../config/firebaseDBRef');
const postsCollection = firebaseCollections.posts;
const commentsCollection = firebaseCollections.comments;
const FieldValue = require('firebase-admin').firestore.FieldValue;

const moment = require('moment');

module.exports.createPost = async (postObj) => {
  let postId = uuidv4();
  let postTextContent = postObj.text;
  let postImage = postObj.image;
  let authorUserId = postObj.authorUserId;

  var dataObj = {
    postId: postId,
    postTextContent: postTextContent,
    postImage: postImage,
    authorUserId: authorUserId,
    createTime: admin.firestore.Timestamp.fromMillis(moment().format('x'))
  };

  return postsCollection().then((col) => {
    return col.doc(postId).set(dataObj).then(() => {
      console.log(dataObj, `Create post success. ${postId}`);
      return dataObj;
    })
  })
}

module.exports.getPost = async (postId) => {
  console.log(postId, "postId del")
  return postsCollection().then((col) => {
    return col.doc(postId).get().then((doc) => {
      if (!doc.exists) {
        console.log('No such document!', doc.data());
        return doc.data();
      } else {
        console.log('Post data:', doc.data());
        return doc.data();
      }
    })
  }).catch((err) => {
    console.log('Error getting documents', err);
    return null;
  })
}

module.exports.getUserPost = async (userId) => {
  return postsCollection().then((col) => {
    return col.where('authorUserId', '=', userId).orderBy('createTime').get().then(function(querySnapshot) {
      let postList = [];
      querySnapshot.forEach(function(doc) {
        postList.push(doc.data());
      });
      return postList;
    });
  });
}

module.exports.deletePost = async (postId) => {
  return postsCollection().then((col) => {
    return col.doc(postId).delete();
  });
}

module.exports.postComment = async (postId, text, authorId) => {
  let createTime = admin.firestore.Timestamp.fromMillis(moment().format('x'));
  let commentId = uuidv4();
  var commentObj = {
    commentId: commentId,
    postId: postId,
    createTime: createTime,
    text: text,
    authorId: authorId,
    like: 0
  };
  return commentsCollection().then((col) => {
    return col.doc(postId).set({
      [`${commentId}`]: commentObj
      }, {merge: true}).then(()=>{
        return commentId;
      });
  });
}

module.exports.deleteComment = async (postId, commentId) => {
  return commentsCollection().then((col) => {
    return col.doc(postId).update({
      [`${commentId}`]: FieldValue.delete()
    }).then(()=>{
      return commentId;
    });
  });
}
