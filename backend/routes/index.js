const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandlers')
const { postLogin } = require('./login')
const { postPost, getTimeline, deletePost, getPost } = require('./posts')
const { postFellow, postUnfellow, getFellower, getProfile } = require('./users')

// login
router.post('/login', catchErrors(postLogin));

// posts
router.post('/posts', catchErrors(postPost));
router.get('/posts/getTimeline', catchErrors(getTimeline));
router.get('/posts/:postId', catchErrors(getPost));
router.delete('/posts/:postId', catchErrors(deletePost));

// users
router.post('/users/fellow', catchErrors(postFellow));
router.post('/users/unfellow', catchErrors(postUnfellow));
router.get('/users/fellower', catchErrors(getFellower));
router.get('/users/profile', catchErrors(getProfile));

module.exports = router
