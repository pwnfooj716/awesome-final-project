var admin = require("firebase-admin");

const getCollection = (collectionName) => {
  return async () => {
    const db = admin.firestore();
    return db.collection(collectionName);
  }
}

module.exports = {
  users: getCollection('/users'),
  posts: getCollection('/posts'),
  following: getCollection('/following'),
  follower: getCollection('/follower'),
  comments: getCollection('/comments'),
  like: getCollection('/like')
}
