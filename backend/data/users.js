/* eslint-disable no-console */
const uuidv4 = require('uuid/v4')
const admin = require('firebase-admin');
const firebaseCollections = require('../config/firebaseDBRef')
const userCollection = firebaseCollections.users

module.exports.isUserExist = async (userId) => {
  return userCollection().then((col) => {
    return col.doc(userId).get().then((snapshot) => {
      if (snapshot.exists) {
        return true;
      } else {
        return false;
      }
    })
  })
}

module.exports.createUser = async (userObj) => {
  let userId = userObj.user_id;
  let email = "";
  if (userObj.email) {
    email = userObj.email;
  }
  let timestamp = new Date().getTime();
  var dataObj = {
    userId: userId,
    name: userObj.name,
    email: email,
    emailVerified: userObj.email_verified,
    createTime: timestamp,
    firebase: userObj.firebase,
    picture: userObj.picture
  };
  
  return userCollection().then((col) => {
    return col.doc(userId).set(dataObj).then((snapshot) => {
      console.log(dataObj, "Create user success.");
      return true;
    })
  })
}

module.exports.getUsers = async () => {
  return userCollection().then((col) => {
      return col.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
        console.log(123)
        return 123;
      })
    }).catch((err) => {
      console.log('Error getting documents', err);
      return 234;
    })
}