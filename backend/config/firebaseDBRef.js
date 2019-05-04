var admin = require("firebase-admin");

const getCollection = (collectionName) => {
  return async () => {
    let targetCollection;
    const db = admin.firestore();
    // targetCollection = db.collection(collectionName);
    // console.log(targetCollection, targetCollection.get, '123')
    return db.collection(collectionName);
  }
}

module.exports = {
  users: getCollection('/users')
}
