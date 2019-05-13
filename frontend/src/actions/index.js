import api from "../ApiService";
import socketIOClient from "socket.io-client";

export const USER_ID = "USER_ID";
export const CURRENT_USER = "CURRENT_USER";
export const FOLLOWING_LIST = "FOLLOWING_LIST";
export const FOLLOWER_COUNT = "FOLLOWER_COUNT";
export const FEEDS = "FEEDS";
export const OTHER_USERS = "OTHER_USERS";
export const USER_POSTS = "USER_POSTS";
export const NO_ACTION = "NO_ACTION";

export const RECEIVE_FEED = "RECEIVE_FEED";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "DELETE_POST";
export const DELETE_POST = "DELETE_POST";
export const FOLLOW = "FOLLOW";
export const UNFOLLOW = "UNFOLLOW";
export const LIKE = "LIKE";
export const UNLIKE = "UNLIKE";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export function setUserId(userId) {
  return {
    type: USER_ID,
    userId
  };
}

export function fetchUserProfileIfNeeded() {
  return (dispatch, getState) => {
    if (!getState().currentUser && getState().userId) {
      return api
        .getProfile(getState().userId)
        .then(response => dispatch(setCurrentUser(response)))
        .catch(err => {
          console.log(err.message);
        });
    }
  };
}

export function fetchFeedsIfNeeded() {
  return (dispatch, getState) => {
    if (getState().feeds.length === 0 && getState().userId) {
      return api
        .getInitialTimeline(getState().userId)        
        .then(response => (dispatch(setFeeds(response))))
        .then(response => (console.log(`Get Feeds : ${response}`)))
        .catch(err => {
          console.log(err.message);
        });
    }
  };
}

export function fetchFollowingListIfNeeded() {
  return (dispatch, getState) => {
    if (getState().followingList.length === 0 && getState().userId) {
      return api
        .getFollowing(getState().userId, 0, -1)
        .then(response => (dispatch(setFollowingList(response))))
        .catch(err => {
          console.log(err.message);
        });
    }
  };
}

export function subscribeToFeedsIfNeeded() {
  return (dispatch, getState) => {
    if (getState().followingList.length !== 0 && getState().userId) {
      const socket = socketIOClient("http://localhost:3030", {
        transports: ["websocket", "xhr-polling"]
      });
      getState().followingList.map(following => {
        return socket.on(`newpost${following.userId}`, data => {
          return dispatch(receiveNotification(data));
        });
      });
    }
  };
}

function setCurrentUser(data) {
  if (data) {
    return {
      type: CURRENT_USER,
      currentUser: data
    };
  }
  return {
    type: NO_ACTION
  }
}

function setFollowingList(data) {
  if (data) {
    return {
      type: FOLLOWING_LIST,
      followingList: data
    };
  }
  return {
    type: NO_ACTION
  }
}

function setFeeds(data) {
  if (data) {
    return {
      type: FEEDS,
      feeds: data.timelinePosts
    };
  }
  return {
    type: NO_ACTION
  }
}

function receiveNotification(data) {
  if (data) {
    return {
      type: RECEIVE_FEED,
      receivedFeed: data
    };
  }
  return {
    type: NO_ACTION
  }
}
