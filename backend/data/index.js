const userData = require('./users');
const postData = require('./posts');
const followData = require('./follow');
const likeData = require('./like');

module.exports = {
  users: userData,
  posts: postData,
  follow: followData,
  like: likeData
}
