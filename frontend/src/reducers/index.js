import { combineReducers } from "redux";
import {
  USER_ID,
  REQUEST_CURRENT_USER,
  RECEIVE_CURRENT_USER,
  REQUEST_OTHER_USERS,
  RECEIVE_OTHER_USERS,
  REQUEST_FOLLOWING_LIST,
  RECEIVE_FOLLOWING_LIST,
  REQUEST_FEEDS,
  RECEIVE_FEEDS,
  REQUEST_USER_POSTS,
  RECEIVE_USER_POSTS
} from "../actions";

function userId(state = null, action) {
  switch (action.type) {
    case USER_ID:
      return action.userId;
    default:
      return state;
  }
}

function currentUser(
  state = {
    isLoading: false,
    items: null
  },
  action
) {
  switch (action.type) {
    case REQUEST_CURRENT_USER:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.currentUser
      });
    default:
      return state;
  }
}

function otherUsers(
  state = {
    isLoading: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_OTHER_USERS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVE_OTHER_USERS:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.otherUsers
      });
    default:
      return state;
  }
}

function followingList(
  state = {
    isLoading: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_FOLLOWING_LIST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVE_FOLLOWING_LIST:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.followingList
      });
    default:
      return state;
  }
}

function feeds(
  state = {
    isLoading: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_FEEDS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVE_FEEDS:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.feeds
      });
    default:
      return state;
  }
}

function userPost(
  state = {
    isLoading: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_USER_POSTS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVE_USER_POSTS:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.userPost
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  userId,
  currentUser,
  followingList,
  feeds,
  otherUsers,
  userPost
});

export default rootReducer;
