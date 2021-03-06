/* eslint-disable no-console */
const admin = require('firebase-admin');
const data = require('../data')
const usersData = data.users

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://cs554-awesome-final.firebaseio.com'
// });

module.exports.postLogin = async (request, response) => {
  const reqData = request.body;

  if (!reqData || !reqData.idToken) {
    response.status(400).json({ error: 'You must provide data to create task' })
    return;
  }
  
  // idToken comes from the client app
  admin.auth().verifyIdToken(reqData.idToken)
    .then(async function(decodedToken) {
    var userId = decodedToken.user_id;
    if (reqData.name) {
      decodedToken.name = reqData.name;
    }
    let isUserExist = await usersData.isUserExist(userId);
    if (!isUserExist) {
      await usersData.createUser(decodedToken, reqData.idToken);
    }
    let userData = await usersData.getProfile(userId);
    response.json(userData);
  }).catch(function(error) {
    console.log(error)
    response.status(500).json({ error: 'Internal error' })
  });
}

module.exports.postSignIn = async (request, response) => {
  const {email, password} = request.body;
  let userData = await usersData.getUserByEmail(email);
  response.json(userData);
}
