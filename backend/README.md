# Awesome Final Project - Backend.

## 1. Login

Login using Firebase auth. And we will only support Google account.
Test code please refer to /frontend/public/data_dev/login.html


## 2. Authentication

* Client login via Firebase. Get the TOKEN.
* Client save that TOKEN in Cookies.
* Client invoke the login api with TOKEN.
* If success, client will using that TOKEN for all request.

For convient for client debug. Server side will implement the API request
authentication after most works done.


## 3. APIs

Please refer API usage from:
backend/routes/index.js

Any problem and issues please ask Chengzhi Yang.


## 4. Server side dependency

To properly run the backend app. You need setup an environment variable 
like below, the "key" file I have sent to the Slack channel:

```
// !! Don't upload or put the key into the project folder or Git it.
// !! Please Using email or slack to share the key.
// export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"
// Example to set the key.
// export GOOGLE_APPLICATION_CREDENTIALS="/cs554/cs554-awesome-final-firebase-adminsdk-nj3fw-d2ac682404.json"
```

And you need install and run the redis server with default port.
