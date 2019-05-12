/* eslint-disable no-console */
const data = require('../data');
const postsData = data.posts;
const followData = data.follow;

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
  let postData;

  // TODO: Validate the postId

  let client = request.redis;
  let cachedData = await client.getAsync(postId);
  if (cachedData) {
    postData = JSON.parse(cachedData);
  } else {
    postData = await postsData.getPost(postId);
    await client.setAsync(
      postId,
      JSON.stringify(postData)
    );
  }

  response.json(postData);
}

module.exports.deletePost = async (request, response) => {
  const postId = request.params.postId;
  let isSuccess = await postsData.deletePost(postId);
  if (isSuccess) console.log('Delete success!');
  response.json({postId: postId})
}

module.exports.postComment = async (request, response) => {
  const { postId, text, authorId } = request.body;
  let commentId = await postsData.postComment(postId, text, authorId);
  response.json({commentId: commentId});
}

module.exports.deleteComment = async (request, response) => {
  const postId = request.params.postId;
  const commentId = request.params.commentId;
  let deletedId = await postsData.deleteComment(postId, commentId);
  response.json({deletedId: deletedId});
}

module.exports.getTimeline = async (request, response) => {
  const userId = request.params.userId;
  let startIndex = request.params.startIndex;
  let limit = request.params.limit;

  if (!startIndex) startIndex = 0;
  if (!limit) limit = 20;

  let followingList = await followData.getFollowingList(userId, 0, 100);

  let allPosts = [];
  for (let i = 0; i < followingList.length; i++) {
    let uid = followingList[i].userId;
    
    let userPosts = await postsData.getUserPost(uid);
    allPosts = allPosts.concat(userPosts);
  }
  allPosts.slice(startIndex, startIndex + limit);
  response.json({userId: userId, timelinePosts: allPosts});
}