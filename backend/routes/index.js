const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandlers')
const { postLogin } = require('./login')
const { postPost, getTimeline } = require('./posts')
const { postFellow, postUnfellow, getFellower } = require('./users')

// login
router.post('/login', catchErrors(postLogin));

// posts
router.post('/posts', catchErrors(postPost));
router.post('/getTimeline', catchErrors(getTimeline));

// users
router.post('/fellow', catchErrors(postFellow));
router.post('/unfellow', catchErrors(postUnfellow));
router.get('/getFellower', catchErrors(getFellower));

module.exports = router
