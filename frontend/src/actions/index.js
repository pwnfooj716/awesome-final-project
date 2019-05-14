import api from "../ApiService";

export const USER_ID = "USER_ID";
export const REQUEST_CURRENT_USER = "REQUEST_CURRENT_USER";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const REQUEST_OTHER_USERS = "REQUEST_OTHER_USERS";
export const RECEIVE_OTHER_USERS = "RECEIVE_OTHER_USERS";
export const REQUEST_FOLLOWING_LIST = "REQUEST_FOLLOWING_LIST";
export const RECEIVE_FOLLOWING_LIST = "RECEIVE_FOLLOWING_LIST";
export const REQUEST_FEEDS = "REQUEST_FEEDS";
export const RECEIVE_FEEDS = "RECEIVE_FEEDS";
export const REQUEST_USER_POSTS = "REQUEST_USER_POSTS";
export const RECEIVE_USER_POSTS = "RECEIVE_USER_POSTS";
export const REMOVE_OTHER_USERS = "REMOVE_OTHER_USERS";
export const RECEIVE_FOLLOWER_LIST ="RECEIVE_FOLLOWER_LIST";
export const REQUEST_FOLLOWER_LIST ="REQUEST_FOLLOWER_LIST";
const NO_ACTION = "NO_ACTION";

export function setUserId(userId) {
  return {
    type: USER_ID,
    userId
  };
}

export function fetchUserProfileIfNeeded() {
  return (dispatch, getState) => {
    if (
      getState().currentUser.isLoading ||
      getState().currentUser.items ||
      getState().currentUser.items === getState().userId ||
      !getState().userId
    ) {
      return {
        type: NO_ACTION
      };
    }
    dispatch(requestProfile());
    return api
      .getProfile(getState().userId)
      .then(response => dispatch(receiveProfile(response)))
      .catch(err => {
        console.log(err.message);
      });
  };
}

function requestProfile() {
  return {
    type: REQUEST_CURRENT_USER
  };
}

function receiveProfile(data) {
  if (data) {
    return {
      type: RECEIVE_CURRENT_USER,
      currentUser: data
    };
  }
  return {
    type: NO_ACTION
  };
}

export function fetchFeedsIfNeeded() {
  return (dispatch, getState) => {
    if (getState().feeds.isLoading || !getState().userId) {
      return {
        type: NO_ACTION
      };
    }
    dispatch(requestFeeds());
    return api
      .getInitialTimeline(getState().userId)
      .then(response => dispatch(receiveFeeds(response)))
      .catch(err => {
        console.log(err.message);
      });
  };
}

function requestFeeds() {
  return {
    type: REQUEST_FEEDS
  };
}

function receiveFeeds(data) {
  if (data) {
    return {
      type: RECEIVE_FEEDS,
      feeds: data.timelinePosts
    };
  }
  return {
    type: NO_ACTION
  };
}

function removeOtherUsers(data) {
  if (data) {
    return {
      type: REMOVE_OTHER_USERS,
      otherUserID: data
    };
  }
  return {
    type: NO_ACTION
  };
}

export function unfollowUser(targetId) {
  return (dispatch, getState) => {
    return api.unFollow(getState().userId, targetId).catch(err => {
      console.log(err.message);
    });
  };
}
