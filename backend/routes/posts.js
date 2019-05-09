/* eslint-disable no-console */
const admin = require('firebase-admin');
const data = require('../data')
const postsData = data.posts


module.exports.postPost = async (request, response, next) => {
  const { text, image, authorUserId } = request.body;
  let postData = {
    text: text,
    image: image,
    authorUserId: authorUserId
  } 
  let createdData = await postsData.createPost(postData);
  response.json(createdData);
}

module.exports.getTimeline = async (request, response, next) => {

}

module.exports.deletePost = async (request, response, next) => {

}

