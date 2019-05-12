import { combineReducers } from 'redux'
import {
  USER_ID,
  CURRENT_USER,
  FOLLOWING_LIST,
  FOLLOWING_COUNT,
  FOLLOWER_COUNT,
  FEEDS,
  OTHER_USERS,
  USER_POSTS,
  NOTIFICATION_COUNT,
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

function followingCount(state = null, action) {
  switch (action.type) {
    case FOLLOWING_COUNT:
      return action.followingCount
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

function notificationCount(state = 0, action) {
  switch (action.type) {
    case NOTIFICATION_COUNT:
      return state.notificationCount + action.notificationCount
    default:
      return state
  }
}

function receiveFeed(state = 0, action) {
  switch (action.type) {
    case RECEIVE_FEED:
      return [...state.feeds, action.feeds]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  userId,
  currentUser,
  followingList,
  followingCount,
  followerCount,
  feeds,
  otherUsers,
  userPost,
  notificationCount,
  receiveFeed
})

export default rootReducer