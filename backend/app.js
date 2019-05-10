/* eslint-disable no-console */
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const admin = require('firebase-admin');
const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // Using the Cloud firestore, so comment out the database
  // databaseURL: 'https://cs554-awesome-final.firebaseio.com'
});

// To setup the API credential
// !! Don't upload or put the key into the project folder or Git it.
// !! Please Using email or slack to share the key.
// export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"
// Example to set the key.
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/yangchengzhi/Dropbox/2nd_semester/cs554/cs554-awesome-final-firebase-adminsdk-nj3fw-d2ac682404.json"

app.use(function(req, res, next) {
  req.redis = client;
  next();
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use('/public', express.static('../frontend/public'));
app.use('/api', routes)

// Catch 404 and forward to error handler
// app.use(function (request, response, next) {
//   const err = new Error(translate('errorMessage404Route', response.locals.currentLocale.code))
//   err.status = 404
//   next(err)
// })

app.listen(3030, function () {
  console.log('Server listening on port 3030!');
})