/* eslint-disable no-console */
const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const admin = require('firebase-admin');
const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  path: "/socket.io"
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

let sockets = {}
io.on("connection", (socket) => {
  console.log("New client connected")
  socket.send({
    from: "test0",
    to: "test1",
    message: "testing message"
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
  socket.on("init", (userId) => {
    sockets[userId] = socket
  })
  socket.on("message", (data, status) => {
    console.log("Socket received message")
    console.log(data)
    // Check if recipient is online
    if (!sockets[data.otherUser]) {
      status("offline")
    } else {
      status("online")
      // Relay the message to the correct recipient
      sockets[data.otherUser].send(data)
    }
  })
})

app.use(cors());

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // Using the Cloud firestore, so comment out the database
  // databaseURL: 'https://cs554-awesome-final.firebaseio.com'
});

app.use(cors());
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
app.use("/socket.io", (req, res) => {
  res.sendStatus(200)
})

// Catch 404 and forward to error handler
// app.use(function (request, response, next) {
//   const err = new Error(translate('errorMessage404Route', response.locals.currentLocale.code))
//   err.status = 404
//   next(err)
// })

// We need to use 'server' here instead of 'app' in order for socket.io to work, but it works exactly the same way
server.listen(3030, function () {
  console.log('Server listening on port 3030!');
})
