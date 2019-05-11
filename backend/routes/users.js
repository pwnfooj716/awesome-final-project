/* eslint-disable no-console */
const data = require('../data');
const followData = data.follow;

module.exports.postFellow = async (request, response) => {
  const reqData = request.body;
  let userId = reqData.userId;
  let targetId = reqData.targetId;
  let result = await followData.follow(userId, targetId);

  response.json(result);
}

module.exports.postUnfellow = async (request, response) => {
  const reqData = request.body;
  let userId = reqData.userId;
  let targetId = reqData.targetId;
  let result = await followData.unfollow(userId, targetId);

  response.json(result);
}

module.exports.getFellower = async (request, response) => {
  let userId = request.params.userId;
  let startIndex = request.params.startIndex;
  let limit = request.params.limit;

  if (limit > 100) limit = 100;

  let follower = await followData.getFollowerList(userId, startIndex, limit);
  response.json(follower);
}

module.exports.getProfile = async (request, response) => {
  
}