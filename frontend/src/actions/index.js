import api from "../ApiService";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:3030", {
  transports: ["websocket", "xhr-polling"]
});

export const USER_ID = "USER_ID";
export const CURRENT_USER = "CURRENT_USER";
export const FOLLOWING_LIST = "FOLLOWING_LIST";
export const FOLLOWING_COUNT = "FOLLOWING_COUNT";
export const FOLLOWER_COUNT = "FOLLOWER_COUNT";
export const FEEDS = "FEEDS";
export const OTHER_USERS = "OTHER_USERS";
export const USER_POSTS = "USER_POSTS";
export const NOTIFICATION_COUNT = "NOTIFICATION_COUNT";

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
        .then(response => response.json())
        .then(data => dispatch(setCurrentUser(data)));
    }
  };
}

export function fetchFeedsIfNeeded() {
  return (dispatch, getState) => {
    console.log("feed init");
    if (getState().feeds.length === 0 && getState().userId) {
      console.log("feed init");
      return api
        .getInitialTimeline(getState().userId)
        .then(response => console.log(response))
        .then(response => response.json())
        .then(data => dispatch(setFeeds(data)));
    }
  };
}

export function fetchFollowingListIfNeeded() {
  return (dispatch, getState) => {
    if (getState().followingList.length === 0 && getState().userId) {
      return api
        .getFollowing(getState().userId, 0, -1)
        .then(response => console.log(response))
        .then(response => response.json())
        .then(data => dispatch(setFollowingList(data)));
    }
  };
}

export function subscribeToFeedsIfNeeded() {
  return (dispatch, getState) => {
    if (getState().followingList.length !== 0 && getState().userId) {
      getState().followingList.map(following => {
        return socket.on(`newpost${following.userId}`, data => {
          dispatch(receiveNotification(data))
          return dispatch(receiveFeed(data));
        });
      });
    }
  };
}

function setCurrentUser(data) {
  return {
    type: CURRENT_USER,
    currentUser: data.data
  };
}

function setFollowingList(data) {
  return {
    type: FOLLOWING_LIST,
    followingList: data.data
  };
}

function setFeeds(data) {
  return {
    type: FEEDS,
    feeds: data.data
  };
}

function receiveNotification(data) {
  return {
    type: NOTIFICATION_COUNT,
    notificationCount: data.length
  };
}

function receiveFeed(data) {
  return {
    type: RECEIVE_FEED,
    feeds: data
  };
}
