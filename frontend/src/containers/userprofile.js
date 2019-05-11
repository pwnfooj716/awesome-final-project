import React, { Component } from "react";
import "../styles/profile.css";
class userprofile extends Component {
  constructor(props){
    super(props)
    this.state = {
      postPic: null,
    }
  }
  setPic(pic){
    this.setState({
      postPic: pic
    })
  }
  render() {
    const photo = 'https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599'
    const userName = 'Harvey Specter'
    const email = 'test@email.com'
    const posts = [
      {
        id: '1',
        photo: 'https://i2.wp.com/www.followmeaway.com/wp-content/uploads/2018/08/nyc-photography-top-of-the-rock-sunset.jpg?resize=700%2C394&ssl=1',
        TextContent: 'great view from NYC'
      },
      {
        id: '2',
        photo: 'https://pbs.twimg.com/media/DxJGLvIV4AA96hn.jpg',
        TextContent: 'games'
      },
      {
        id: '3',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Tesla_Model_3_parked%2C_front_driver_side.jpg',
        TextContent: 'my car'
      },
      {
        id:'4',
        photo: 'https://enzospizzaco.com/images/award-winning-pizza-catering-no-video.jpg',
        TextContent: 'my favorite pizza'
      }
    ]
    const Followers = [
      {
        name: 'BatMan',
        photo: 'https://imgix-media.wbdndc.net/cms/filer_public_thumbnails/filer_public/22/75/2275b2f7-431d-49a9-b4b0-2d0c79e3e7e3/batman-profile-293d6d-bm_cv17_ns-1-v1-1500x2244-masthead.jpg__387x579_q85_crop_subsampling-2_upscale.jpg'
      },
      {
        name: 'SuperMan',
        photo: 'https://i.kinja-img.com/gawker-media/image/upload/s--Q_RyW1gk--/c_scale,f_auto,fl_progressive,q_80,w_800/endahrasa3dxot980mjf.png'
      }
    ]
    const FollowerNumb = Followers.length;
    const postNumb = posts.length;
    const listPosts = posts.map((post)=>
      <div class="postBlock">
        <img class="post" src={post.photo} alt={post.TextContent} onClick={()=>this.setPic(post.photo)} data-toggle="modal" data-target="#postModal" />
        <center class="postContent" > {post.TextContent} </center>
      </div>
      );
    const listFollowers = Followers.map((follower)=>
      <div>
        <img class="followerImg" src={follower.photo} alt={follower.name} />
        <center class="followerName"> {follower.name} </center>
      </div>
      );

    return (
      <div style={{ padding: "0 50px", marginTop: 64 }}>
        <div style={{ margin: '0 auto', width: '100%' }}>


    <div class="modal fade" id="followerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Follower:</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {listFollowers}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="postModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modalsize" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Post:</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="postPic" src={this.state.postPic} alt="Posted Pic"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

        <header>
        <img class="userPic" src={photo} alt="Smiley face" />
        <div class="userInfo">
        <h1 class="name">{userName}</h1>
        <button class="editBtn" type="button">Edit Profile</button>
        <h2 class="email">{email}</h2>
        <div class= "follow"> <b>{postNumb} </b> <strong>Posts</strong> </div>
        <div class="follow pointer" data-toggle="modal" data-target="#followerModal"> <b>{FollowerNumb} </b> <strong>Following</strong></div>
        </div>
        </header>
      </div>
      <div class="postbox">
        <center class="pTitle">My Posts</center>
        <div>{listPosts}</div>
      </div>
      </div>

    );
  }
}

export default userprofile;
