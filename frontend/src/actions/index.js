import api from "../ApiService";
import Cookies from "universal-cookie";

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
export const USER_ID = "USER_ID";

const cookies = new Cookies();

export function refreshUserId() {
  let uid = cookies.get("userId");
  uid = uid ? uid : null;
  return (dispatch, getState) => {
    console.log(`acton${uid}${getState().userId}`)
    if (!getState().userId || uid !== getState().userId) {
      dispatch(setUserId(uid));
    }
  };
}

function setUserId(data) {
  return {
    type: USER_ID,
    userId: data
  };
}

export function fetchUserProfileIfNeeded() {
  return (dispatch, getState) => {
    let uid = cookies.get("userId");
    if (
      uid &&
      (!getState().currentUser.items ||
        getState().currentUser.items.userId !== uid) &&
      !getState().currentUser.isLoading
    ) {
      dispatch(requestProfile());
      return api
        .getProfile(uid)
        .then(response => dispatch(receiveProfile(response)))
        .catch(err => {
          console.log(err.message);
        });
    }
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
}

export function fetchFeedsIfNeeded() {
  return (dispatch, getState) => {
    let uid = cookies.get("userId");
    if (uid && !getState().feeds.isLoading) {
      dispatch(requestFeeds());
      return api
        .getInitialTimeline(uid)
        .then(response => dispatch(receiveFeeds(response)))
        .catch(err => {
          console.log(err.message);
        });
    }
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
}

export function fetchFollowingListIfNeeded() {
  return (dispatch, getState) => {
    let uid = cookies.get("userId");
    if (uid && !getState().followingList.isLoading) {
      dispatch(requestFollowingList());
      return api.getFollowing(uid)
        .then(response => dispatch(receiveFollowingList(response)))
        .catch(err => {
          console.log(err.message);
        });
    }
  };
}

function requestFollowingList() {
  return {
    type: REQUEST_FOLLOWING_LIST
  };
}

function receiveFollowingList(data) {
  if (data) {
    console.log(data)
    return {
      type: RECEIVE_FOLLOWING_LIST,
      followingList: data
    };
  }
}

export function fetchFollowerListIfNeeded() {
  return (dispatch, getState) => {
    if (getState().followerList.isLoading || !getState().userId) {
      return {
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
}

export function fetchOtherUsersIfNeeded() {
  return (dispatch, getState) => {
    let uid = cookies.get("userId");
    if (getState().otherUsers.isLoading || !uid) {
      return {
      };
    }
    dispatch(requestOtherUsers());
    return api
      .getOtherUsers(uid)
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
}

export function fetchUserPostsIfNeeded() {
  return (dispatch, getState) => {
    let uid = cookies.get("userId");
    if (getState().userPost.isLoading || !uid) {
      return {
      };
    }
    dispatch(requestPosts());
    return api
      .getUserPosts(uid)
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
}

export function followUser(targetId) {
  return (dispatch, getState) => {
    let uid = cookies.get("userId");
    return api.follow(uid, targetId).catch(err => {
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
}
export function likePost(targetId){
  return(dispatch,getState)=>{
    return api
    .like(getState().userId, targetId)
    .catch(err=>{
        console.log(err.message);
    });
  };
}
export function unlikePost(targetId) {
  return (dispatch, getState) => {
    return api.unlike(getState().userId, targetId).catch(err => {
      console.log(err.message);
    });
  };
}

export function getLikeStatus(targetId){
  return (dispatch, getState) => {
    return api.getLikeStatus(getState().userId, targetId).catch(err => {
      console.log(err.message);
    });
  };
}

export function unfollowUser(targetId) {
  return (dispatch, getState) => {
    let uid = cookies.get("userId");
    return api.unFollow(uid, targetId).catch(err => {
      console.log(err.message);
    });
  };
}
