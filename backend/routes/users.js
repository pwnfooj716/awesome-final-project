/* eslint-disable no-console */
const admin = require('firebase-admin');
const data = require('../data');
const usersData = data.users;
const followData = data.follow;

module.exports.postFellow = async (request, response) => {
  const reqData = request.body;
  let userId = reqData.userId;
  let targetId = reqData.targetId;
  console.log(userId, targetId, 'aaa');
  let result = await followData.follow(userId, targetId);

  response.json(result);
}

module.exports.postUnfellow = async (request, response) => {
  let userId = request.params.userId;
  let targetId = request.params.targetId;
  let result = await followData.unfollow(userId, targetId);

  response.json(result);
}

module.exports.getFollower = async (request, response) => {
  let userId = request.params.userId;
  let follower = await followData.getFollower(userId);
  response.json(follower);
}

module.exports.getProfile = async (request, response) => {

}