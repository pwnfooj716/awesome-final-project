const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const admin = require('firebase-admin');
// const dataTest = require('./data')
// const dataTestUsers = dataTest.users

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // Using the Cloud firestore, so comment out the database
  // databaseURL: 'https://cs554-awesome-final.firebaseio.com'
});

// let a = async ()=>{
//   let res = await dataTestUsers.getUsers();
//   console.log(res, 'ss')
// }
// a();

// To setup the API credential
// !! Don't upload or put the key into the project folder or Git it.
// !! Please Using email or slack to share the key.
// export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"
// Example to set the key.
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/yangchengzhi/Dropbox/2nd_semester/cs554/cs554-awesome-final-firebase-adminsdk-nj3fw-d2ac682404.json"

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// app.use(cookieParser());

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