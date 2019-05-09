/* eslint-disable no-console */
const data = require('../data')
const postsData = data.posts

module.exports.postPost = async (request, response) => {
  const { text, image, authorUserId } = request.body;
  let postData = {
    text: text,
    image: image,
    authorUserId: authorUserId
  } 
  let createdData = await postsData.createPost(postData);
  response.json(createdData);
}

module.exports.getPost = async (request, response) => {
  let postId = request.params.postId;
  let postData = await postsData.getPost(postId);
  response.json(postData);
}

module.exports.getTimeline = async (request, response) => {
  
}

module.exports.deletePost = async (request, response) => {
  const postId = request.params.postId;
  let isSuccess = await postsData.deletePost(postId);
  if (isSuccess) console.log('Delete success!');
  response.json({postId: postId})
}

