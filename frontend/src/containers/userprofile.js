import React, { Component } from "react";
import "../styles/profile.css";
import ChangeAvator from "../components/ChangeAvator";
import { connect } from "react-redux";
import { fetchUserProfileIfNeeded, fetchUserPostsIfNeeded, fetchFollowingListIfNeeded,fetchFollowerListIfNeeded} from "../actions";
import PropTypes from "prop-types";
import { Redirect } from 'react-router';
import ApiService from "../ApiService";

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
    if(this.state.username==undefined){
    this.setState({
      username: user
    })
    console.log("change to: " + this.state.username);
  }
  }
  setUser2(user){
    
    this.setState({
      username: user
    })
    console.log("change to: " + this.state.username);
  
  }

  updataName(text,userid){
        ApiService
        .updateUser(text,userid)
        .catch(err=>{
        console.log(err.message);
    });
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
    // const photo = 'https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599'
    // const userName = 'Harvey Specter'
    // const email = 'test@email.com'
    // const posts = [
    //   {
    //     id: '1',
    //     photo: 'https://i2.wp.com/www.followmeaway.com/wp-content/uploads/2018/08/nyc-photography-top-of-the-rock-sunset.jpg?resize=700%2C394&ssl=1',
    //     TextContent: 'great view from NYC'
    //   },
    //   {
    //     id: '2',
    //     photo: 'https://pbs.twimg.com/media/DxJGLvIV4AA96hn.jpg',
    //     TextContent: 'games'
    //   },
    //   {
    //     id: '3',
    //     photo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Tesla_Model_3_parked%2C_front_driver_side.jpg',
    //     TextContent: 'my car'
    //   },
    //   {
    //     id:'4',
    //     photo: 'https://enzospizzaco.com/images/award-winning-pizza-catering-no-video.jpg',
    //     TextContent: 'my favorite pizza'
    //   }
    // ]
    // const Followers = [
    //   {
    //     name: 'BatMan',
    //     photo: 'https://imgix-media.wbdndc.net/cms/filer_public_thumbnails/filer_public/22/75/2275b2f7-431d-49a9-b4b0-2d0c79e3e7e3/batman-profile-293d6d-bm_cv17_ns-1-v1-1500x2244-masthead.jpg__387x579_q85_crop_subsampling-2_upscale.jpg'
    //   },
    //   {
    //     name: 'SuperMan',
    //     photo: 'https://i.kinja-img.com/gawker-media/image/upload/s--Q_RyW1gk--/c_scale,f_auto,fl_progressive,q_80,w_800/endahrasa3dxot980mjf.png'
    //   }
    // ]
    const { userPost, currentUser, followingList, followerList } = this.props;
    try{
      const FollowerNumb = currentUser.items.followerNum;
      const FollowingNumb = currentUser.items.followingNum;
      
    const postNumb = userPost.items.length;
    const photo = userPost.items.picture;
    // const listPosts = userPost.items.map((post)=>
    //   <div className="postBlock">
    //     <img className="post" src={post.photo} alt={post.TextContent} onClick={()=>this.setPic(post.photo)} data-toggle="modal" data-target="#postModal" />
    //     <center className="postContent" > {post.TextContent} </center>
    //   </div>
    //   );
    // const listFollowers = Followers.map((follower)=>
    //   <div>
    //     <img className="followerImg" src={follower.photo} alt={follower.name} />
    //     <center className="followerName"> {follower.name} </center>
    //   </div>
    //   );

    const followings = followingList.items;
    const followers = followerList.items;
    this.setUser(currentUser.items.name);
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
          <button className="btn btn-primary submit" onClick={()=>this.updataName("the shy","Q7dj2BsyESh7LJVR1FeUSwkNWLt2")}>Submit </button>
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
        <img className="userPic rounded-circle pointer" src={photo} alt={"img of "+currentUser.items.name} data-toggle="modal" data-target="#AvatarModal" />
        <div className="userInfo">
        
        <h1 className="name">{this.state.username}</h1>
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
