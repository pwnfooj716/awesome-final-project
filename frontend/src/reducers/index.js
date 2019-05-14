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
  RECEIVE_USER_POSTS,
  REMOVE_OTHER_USERS,
  RECEIVE_FOLLOWER_LIST,
  REQUEST_FOLLOWER_LIST
} from "../actions";



function followerList(
  state = {
    isLoading: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_FOLLOWER_LIST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVE_FOLLOWER_LIST:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.followerList
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
