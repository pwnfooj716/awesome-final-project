const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandlers')
const { postLogin, postSignIn } = require('./login')
const { postPost, getTimeline, deletePost, getPost, postComment,
  postLikePost, postUnlikePost, deleteComment, getLikeStatus } = require('./posts')
const { postFollow, postUnfollow, getFollower, getFollowing, 
  getProfile, patchUser, getSuggestions } = require('./users')

// login
router.post('/login', catchErrors(postLogin));
router.post('/signin', catchErrors(postSignIn));

// posts
router.post('/posts', catchErrors(postPost));
router.get('/posts/getTimeline/:userId', catchErrors(getTimeline));
router.get('/posts/:postId', catchErrors(getPost));
router.delete('/posts/:postId', catchErrors(deletePost));
router.post('/comments', catchErrors(postComment));
router.delete('/comments/:postId/:commentId', catchErrors(deleteComment));
router.post('/posts/:postId/like', catchErrors(postLikePost));
router.post('/posts/:postId/unlike', catchErrors(postUnlikePost));
router.get('/posts/:postId/:userId/like', catchErrors(getLikeStatus));

// users
router.post('/users/follow', catchErrors(postFollow));
router.post('/users/unfollow', catchErrors(postUnfollow));
router.get('/users/follower/:userId', catchErrors(getFollower));
router.get('/users/following/:userId', catchErrors(getFollowing));
router.get('/users/profile/:userId', catchErrors(getProfile));
router.patch('/users/:userId', catchErrors(patchUser));
router.get('/users/suggestions/:userId', catchErrors(getSuggestions));

module.exports = router;
