import { combineReducers } from 'redux'
import {
  USER_ID,
  CURRENT_USER,
  FOLLOWING_LIST,
  FOLLOWER_COUNT,
  FEEDS,
  OTHER_USERS,
  USER_POSTS,
  RECEIVE_FEED
} from '../actions'

function userId(state = null, action) {
  switch (action.type) {
    case USER_ID:
      return action.userId
    default:
      return state
  }
}

function currentUser(state = null, action) {
  switch (action.type) {
    case CURRENT_USER:
      return action.currentUser
    default:
      return state
  }
}

function followingList(state = [], action) {
  switch (action.type) {
    case FOLLOWING_LIST:
      return action.followingList
    default:
      return state
  }
}

function followerCount(state = null, action) {
  switch (action.type) {
    case FOLLOWER_COUNT:
      return action.followerCount
    default:
      return state
  }
}

function feeds(state = [], action) {
  switch (action.type) {
    case FEEDS:
      return action.feeds
    default:
      return state
  }
}

function otherUsers(state = [], action) {
  switch (action.type) {
    case OTHER_USERS:
      return action.otherUsers
    default:
      return state
  }
}

function userPost(state = [], action) {
  switch (action.type) {
    case USER_POSTS:
      return action.userPost
    default:
      return state
  }
}

function receivedNotifications(state = [], action) {
  switch (action.type) {
    case RECEIVE_FEED:
      return [...state.receivedFeed, action.receivedFeed]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  userId,
  currentUser,
  followingList,
  followerCount,
  feeds,
  otherUsers,
  userPost,
  receivedNotifications
})

export default rootReducer