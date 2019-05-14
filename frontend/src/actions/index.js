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

export function fetchFollowingListIfNeeded() {
  return (dispatch, getState) => {
    if (getState().followingList.isLoading || !getState().userId) {
      return {
        type: NO_ACTION
      };
    }
    dispatch(requestFollowingList());
    return api
      .getFollowing(getState().userId, 0, -1)
      .then(response => dispatch(receiveFollowingList(response)))
      .catch(err => {
        console.log(err.message);
      });
  };
}

function requestFollowingList() {
  return {
    type: REQUEST_FOLLOWING_LIST
  };
}

function receiveFollowingList(data) {
  if (data) {
    return {
      type: RECEIVE_FOLLOWING_LIST,
      followingList: data
    };
  }
  return {
    type: NO_ACTION
  };
}

export function fetchFollowerListIfNeeded() {
  return (dispatch, getState) => {
    if (getState().followerList.isLoading || !getState().userId) {
      return {
        type: NO_ACTION
      };
    }
    dispatch(requestFollowerList());
    return api
      .getFollower(getState().userId, 0, -1)
      .then(response => dispatch(receiveFollowerList(response)))
      .catch(err => {
        console.log(err.message);
      });
  };
}

function requestFollowerList() {
  return {
    type: REQUEST_FOLLOWER_LIST
  };
}

function receiveFollowerList(data) {
  if (data) {
    return {
      type: RECEIVE_FOLLOWER_LIST,
      followerList: data
    };
  }
  return {
    type: NO_ACTION
  };
}

export function fetchOtherUsersIfNeeded() {
  return (dispatch, getState) => {
    if (
      getState().otherUsers.isLoading ||
      getState().otherUsers.items.length !== 0 ||
      !getState().userId
    ) {
      return {
        type: NO_ACTION
      };
    }
    dispatch(requestOtherUsers());
    return api
      .getOtherUsers(getState().userId)
      .then(response => dispatch(receiveOtherUsers(response)))
      .catch(err => {
        console.log(err.message);
      });
  };
}

function requestOtherUsers() {
  return {
    type: REQUEST_OTHER_USERS
  };
}

function receiveOtherUsers(data) {
  if (data) {
    return {
      type: RECEIVE_OTHER_USERS,
      otherUsers: data
    };
  }
  return {
    type: NO_ACTION
  };
}

export function fetchUserPostsIfNeeded() {
  return (dispatch, getState) => {
    if (getState().userPost.isLoading || !getState().userId) {
      return {
        type: NO_ACTION
      };
    }
    dispatch(requestPosts());
    return api
      .getUserPosts(getState().userId)
      .then(response => dispatch(receivePosts(response)))
      .catch(err => {
        console.log(err.message);
      });
  };
}

function requestPosts() {
  return {
    type: REQUEST_USER_POSTS
  };
}

function receivePosts(data) {
  if (data) {
    return {
      type: RECEIVE_USER_POSTS,
      userPost: data
    };
  }
  return {
    type: NO_ACTION
  };
}

export function followUser(targetId) {
  return (dispatch, getState) => {
    return api
      .follow(getState().userId, targetId)
      .catch(err => {
        console.log(err.message);
      });
  };
}

export function postFollowAction(targetId) {
  return (dispatch, getState) => {
    dispatch(receiveOtherUsers());
    return dispatch(removeOtherUsers(targetId));
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
