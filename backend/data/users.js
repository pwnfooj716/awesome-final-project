const uuidv4 = require('uuid/v4')
const admin = require('firebase-admin');
const firebaseCollections = require('../config/firebaseDBRef')
const userCollection = firebaseCollections.users

module.exports.createUser = async (mail) => {

}

module.exports.getUsers = async () => {
  return userCollection()
    .then((col) => {
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