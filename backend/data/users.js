/* eslint-disable no-console */
const admin = require('firebase-admin');
const firebaseCollections = require('../config/firebaseDBRef')
const userCollection = firebaseCollections.users
const moment = require('moment');
const uuidv4 = require('uuid/v4');

module.exports.isUserExist = async (userId) => {
  return userCollection().then((col) => {
    return col.doc(userId).get().then((snapshot) => {
      if (snapshot.exists) {
        return true;
      } else {
        return false;
      }
    });
  });
}

module.exports.createUser = async (userObj, authToken) => {
  let userId = userObj.user_id;
  let email = "";
  if (userObj.email) {
    email = userObj.email;
  }
  let picture = "";
  if (userObj.picture) {
    picture = userObj.picture;
  }
  if (!userObj.name) {
    userObj.name = uuidv4();
  }
  var dataObj = {
    userId: userId,
    name: userObj.name,
    email: email,
    emailVerified: userObj.email_verified,
    createTime: admin.firestore.Timestamp.fromMillis(moment().format('x')),
    firebase: userObj.firebase,
    picture: picture,
    authToken: authToken,
    authTokenExpireTime: admin.firestore.Timestamp.fromMillis(moment().add(1,'months').format('x'))
  };

  console.log(dataObj);
  
  return userCollection().then((col) => {
    return col.doc(userId).set(dataObj).then(() => {
      console.log(dataObj, `Create user success. ${userId}`);
      return dataObj;
    })
  })
}

function getUserPublicData(userDBObj) {
  let userData = {};
  userData.userId = userDBObj.userId;
  userData.picture = userDBObj.picture;
  userData.email = userDBObj.email;
  userData.name = userDBObj.name;
  return userData;
}

module.exports.getUsersList = async () => { 
  return userCollection().then((col) => {
    return col.get().then((snapshot) => {
      let userList = [];
      snapshot.forEach((doc) => {
        // console.log(doc.id, '=>', doc.data());
        if (doc.exists && Object.getOwnPropertyNames(doc).length !== 0) {
          let userData = doc.data();
          userList.push(getUserPublicData(userData));
        }
      });
      return userList;
    });
  }).catch((err) => {
    console.log('Error getting documents', err);
    return false;
  });
}

module.exports.getProfile = async (userId) => {
  return userCollection().then((col) => {
    return col.doc(userId).get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return 404;
      }
    });
  }).catch((err) => {
    console.log('Error getting documents', err);
    return 404;
  });
}

module.exports.getUserByEmail = async (email) => {
  return userCollection().then((col) => {
    return col.where('email', '==', email).get().then(function(snap) {
      let resData = null;
      snap.forEach(function(doc) {
        resData = doc.data();
      });
      return resData;
    });
  });
}

module.exports.setUserName = async (userId, name) => {
  return userCollection().then((col) => {
    return col.doc(userId).update({
      name: name
    });
  });
}

module.exports.setUserPicture = async (userId, picture) => {
  return userCollection().then((col) => {
    return col.doc(userId).update({
      picture: picture
    });
  });
}