import React, { Component } from "react";
import "../styles/profile.css";
import ChangeAvator from "../components/ChangeAvator";
import { connect } from "react-redux";
import { fetchUserProfileIfNeeded, fetchUserPostsIfNeeded, fetchFollowingListIfNeeded,fetchFollowerListIfNeeded } from "../actions";
import PropTypes from "prop-types";
import { Redirect } from 'react-router';

class UserProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      postPic: this.props.postPic,
      avatar: this.props.avatar,
      email: this.props.email,
      username: this.props.username
    }
  }
  setPic(pic){
    this.setState({
      postPic: pic
    })
  }
  setUser(user){
    this.setState({
      username: user
    })
  }
  componentWillMount(){

  }
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(fetchUserProfileIfNeeded());
    dispatch(fetchUserPostsIfNeeded());
    dispatch(fetchFollowingListIfNeeded());
    dispatch(fetchFollowerListIfNeeded());
  }
  render() {

    const { userPost, currentUser, followingList, followerList } = this.props;
    try{
      const FollowerNumb = currentUser.items.followerNum;
      const FollowingNumb = currentUser.items.followingNum;
    const postNumb = userPost.items.length;
    const photo = userPost.items.picture;
    const followings = followingList.items;
    const followers = followerList.items;
    const listFollowing = followings.map((following)=>
      <div>
        <img className="followerImg" scr = {following.userData.picture} alt={following.userData.name} />
        <center className="followerName">{following.userData.name} </center>
      </div>
      );
    const listFollowers = followers.map((follower)=>
      <div>
        <img className="followerImg" scr = {follower.userData.picture} alt={follower.userData.name} />
        <center className="followerName">{follower.userData.name} </center>
      </div>
      );

    return (
      <div style={{ padding: "0 50px", marginTop: 64 }}>
        <div style={{ margin: '0 auto', width: '100%' }}>


    <div className="modal fade" id="followerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Follower:</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {listFollowers}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade" id="followingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Following:</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {listFollowing}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade" id="postModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modalsize" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Post:</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img className="postPic" src={this.state.postPic} alt="Posted Pic"/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

   <div className="modal fade" id="EditModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div className="modal-dialog EditModal cascading-modal modal-avatar modal-sm" role="document">
    <div className="modal-content">

      <div className="modal-header">
        <img src={photo} alt="avatar" className="avatar rounded-circle img-responsive pointer" data-toggle="modal" data-target="#AvatarModal" />
      </div>
      <div className="modal-body text-center mb-1">

        <h4 className="mt-1 mb-2">{currentUser.items.name}</h4>

        <div className="md-form ml-0 mr-0">
         <div>
          <label for="newUserName">New Name:</label>
          <input name="newUserName" className="EditModalInput" id="newUserName" />
         </div>
         <div>
          <label for="NewEmail">New Email:</label>
          <input name="NewEmail" className="EditModalInput" id="NewEmail" />
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button className="btn btn-primary submit">Submit </button>
        </div>
      </div>

    </div>
  </div>
</div>

    <div className="modal fade" id="AvatarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Change Avator:</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ChangeAvator />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

        <header>
        <img className="userPic rounded-circle pointer" src={photo} alt="Smiley face" data-toggle="modal" data-target="#AvatarModal" />
        <div className="userInfo">
        <h1 className="name">{currentUser.items.name}</h1>
        <button className="editBtn" type="button" data-toggle="modal" data-target="#EditModal">Edit Profile</button>
        <h2 className="email">{currentUser.items.email}</h2>
        <div className= "follow"> <b>{postNumb} </b> <strong>Posts</strong> </div>
        <div className="follow pointer" data-toggle="modal" data-target="#followerModal"> <b>{FollowerNumb} </b> <strong>Followers</strong></div>
        <div className="follow pointer" data-toggle="modal" data-target="#followingModal"> <b>{FollowingNumb} </b> <strong>Following</strong></div>
        </div>
        </header>
      </div>
      <div className="postbox">
        <center className="pTitle">My Posts</center>
        <div>listPosts</div>
      </div>
      </div>

    );
    }
    catch{
      return(<Redirect to="/" />);
    }
  }
}

UserProfile.propTypes = {
  currentUser: PropTypes.object,
  userPost: PropTypes.object
};

function mapStateToProps(state) {
  const { currentUser, userPost, followingList,followerList } = state;

  return {
    currentUser,
    userPost,
    followingList,
    followerList
  };
}

export default (connect(mapStateToProps)(UserProfile));
