import api from "../ApiService";
import socketIOClient from "socket.io-client";

export const LOADING_PROFILE = "LOADING_PROFILE";
export const LOADING_FEEDS = "LOADING_FEEDS";

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
    dispatch(loadingProfile(true));
    if (!getState().currentUser && getState().userId) {
      return api.getProfile(getState().userId)
        .then(response => dispatch(setCurrentUser(response)))
        .catch(err => {
          console.log(err.message);
        });
    }
    dispatch(loadingProfile(false));
  };
}

export function fetchFeedsIfNeeded() {
  return (dispatch, getState) => {
    dispatch(loadingFeeds(true));
    if (getState().feeds.length === 0 && !getState().isLoadingFeeds && getState().userId) {
      return api.getInitialTimeline(getState().userId)
        .then(response => dispatch(setFeeds(response)))
        .catch(err => {
          console.log(err.message);
        });
    }
    dispatch(loadingFeeds(false));
  };
}

export function fetchFollowingListIfNeeded() {
  return (dispatch, getState) => {
    if (getState().followingList.length === 0 && getState().userId) {
      return api
        .getFollowing(getState().userId, 0, -1)
        .then(response => dispatch(setFollowingList(response)))
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

export function fetchUsersIfNeeded() {
  return (dispatch, getState) => {
    if (getState().otherUsers.length === 0 && getState().userId) {
      return api.getOtherUsers(getState().userId)
        .then(response => dispatch(setOtherUsers(response)))
        .catch(err => {
          console.log(err.message);
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
  };
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
  };
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
  };
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
  };
}

function loadingProfile(data) {
  return {
    type: LOADING_PROFILE,
    isLoadingProfile: data
  };
}

function loadingFeeds(data) {
  return {
    type: LOADING_FEEDS,
    isLoadingFeeds: data
  };
}

function setOtherUsers(data) {
  return {
    type: OTHER_USERS,
    otherUsers: data
  };
}
