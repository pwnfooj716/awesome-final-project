const express = require('express')
const router = express.Router()
// const data = require('../data')
// const taskData = data.tasks
const admin = require('firebase-admin');

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://cs554-awesome-final.firebaseio.com'
// });

module.exports.postLogin = async (request, response, next) => {
  const reqData = request.body
  console.log(reqData, '123123')

  if (!reqData || !reqData.idToken) {
    response.status(400).json({ error: 'You must provide data to create task' })
    return;
  }
  
  // idToken comes from the client app
  admin.auth().verifyIdToken(reqData.idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    // ...
    console.log(decodedToken)
    response.json({
      title: `${decodedToken}`,
    })
  }).catch(function(error) {
    // Handle error
    console.log(error)
    response.status(500).json({ error: 'Internal error' })
  });
}
