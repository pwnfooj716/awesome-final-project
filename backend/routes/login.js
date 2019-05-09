/* eslint-disable no-console */
const admin = require('firebase-admin');
const data = require('../data')
const usersData = data.users

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
    .then(async function(decodedToken) {
    var userId = decodedToken.user_id;
    // ...
    console.log(decodedToken, "decodedToken")

    // let res = await usersData.getUsers();
    //console.log(res, 'ss')
    let isUserExist = await usersData.isUserExist(userId);
    if (!isUserExist) {
      await usersData.createUser(decodedToken, reqData.idToken);
    }

    response.json({
      title: `${decodedToken}`,
    })
  }).catch(function(error) {
    // Handle error
    console.log(error)
    response.status(500).json({ error: 'Internal error' })
  });
}
