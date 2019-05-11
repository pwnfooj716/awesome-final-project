/* eslint-disable no-console */
const data = require('../data');
const followData = data.follow;
const userData = data.users;

module.exports.postFollow = async (request, response) => {
  const reqData = request.body;
  let userId = reqData.userId;
  let targetId = reqData.targetId;
  let result = await followData.follow(userId, targetId);

  response.json(result);
}

module.exports.postUnfollow = async (request, response) => {
  const reqData = request.body;
  let userId = reqData.userId;
  let targetId = reqData.targetId;
  let result = await followData.unfollow(userId, targetId);

  response.json(result);
}

module.exports.getFollower = async (request, response) => {
  let userId = request.params.userId;
  let startIndex = request.params.startIndex;
  let limit = request.params.limit;

  if (limit > 100) limit = 100;

  let follower = await followData.getFollowerList(userId, startIndex, limit);
  response.json(follower);
}

module.exports.getFollowing = async (request, response) => {
  let userId = request.params.userId;
  let startIndex = request.params.startIndex;
  let limit = request.params.limit;

  if (limit > 100) limit = 100;

  let following = await followData.getFollowingList(userId, startIndex, limit);
  response.json(following);
}

module.exports.getProfile = async (request, response) => {
  let userId = request.params.userId;
  let userProfileData = await userData.getProfile(userId);

  userProfileData.followerNum = await followData.getFollowerNum(userId);
  userProfileData.followingNum = await followData.getFollowingNum(userId);

  // const redisFollowerKey = `${userId}@follower`;
  // const redisFollowingKey = `${userId}@following`;

  // let client = request.redis;
  // let followerNum = await client.getAsync(redisFollowerKey);
  // if (!followerNum) {
  //   console.log(followData.getFollowerNum);
  //   followerNum = await followData.getFollowerNum(userId);
  //   await client.setAsync(
  //     redisFollowerKey,
  //     followerNum
  //   );
  // }
  //userProfileData.followerNum = followerNum;

  // let followingNum = await client.getAsync(redisFollowingKey);
  // if (!followingNum) {
  //   followingNum = await followData.getFollowingNum(userId);
  //   await client.setAsync(
  //     redisFollowingKey,
  //     followingNum
  //   );
  // }
  //userProfileData.followingNum = followingNum;


  response.json(userProfileData);
}
