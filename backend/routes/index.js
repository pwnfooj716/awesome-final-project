const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandlers')
const { postLogin } = require('./login')
const { postPost, getTimeline, deletePost, getPost } = require('./posts')
const { postFollow, postUnfollow, getFollower, getFollowing, getProfile } = require('./users')

// login
router.post('/login', catchErrors(postLogin));

// posts
router.post('/posts', catchErrors(postPost));
router.get('/posts/getTimeline', catchErrors(getTimeline));
router.get('/posts/:postId', catchErrors(getPost));
router.delete('/posts/:postId', catchErrors(deletePost));

// users
router.post('/users/follow', catchErrors(postFollow));
router.post('/users/unfollow', catchErrors(postUnfollow));
router.get('/users/follower/:userId', catchErrors(getFollower));
router.get('/users/following/:userId', catchErrors(getFollowing));
router.get('/users/profile', catchErrors(getProfile));

module.exports = router
