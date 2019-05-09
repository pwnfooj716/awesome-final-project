/* eslint-disable no-console */
const uuidv4 = require('uuid/v4')
const admin = require('firebase-admin');
const firebaseCollections = require('../config/firebaseDBRef')
const postsCollection = firebaseCollections.posts
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

  console.log(dataObj, postId)
  
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

module.exports.deletePost = async (postId) => {
  console.log(postId, "postId del")
  return postsCollection().then((col) => {
    return col.doc(postId).delete();
  })
}


