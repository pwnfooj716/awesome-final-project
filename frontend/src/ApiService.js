import axios from "axios";

class ApiService {
  constructor() {
    this.apiUrl = "http://localhost:3030/api";
  }

  async login(tokenId, name) {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, {
        idToken: tokenId,
        name: name
      });
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getProfile(userId) {
    try {
      const response = await axios.get(
        `${this.apiUrl}/users/profile/${userId}`
      );
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async follow(userId, targetId) {
    try {
      const response = await axios.post(`${this.apiUrl}/users/follow`, {
        userId: userId,
        targetId: targetId
      });
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async unFollow(userId, targetId) {
    try {
      const response = await axios.post(`${this.apiUrl}/users/unfollow`, {
        userId: userId,
        targetId: targetId
      });
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollower(userId, startIndex, limit = 20) {
    try {
      const response = await axios.get(
        `${
          this.apiUrl
        }/users/follower/${userId}?startIndex=${startIndex}&limit=${limit}`
      );
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollowerCount(userId) {
    try {
      const response = await axios.get(
        `${this.apiUrl}/users/followerCount/${userId}`
      );
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollowing(userId, startIndex, limit = 20) {
    try {
      const response = await axios.get(
        `${
          this.apiUrl
        }/users/following/${userId}?startIndex=${startIndex}&limit=${limit}`
      );
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollowingCount(userId) {
    try {
      const response = await axios.get(
        `${this.apiUrl}/users/followingCount/${userId}`
      );
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async addPost(text, image, authorUserId) {
    try {
      const response = await axios.post(`${this.apiUrl}/posts`, {
        text: text,
        image: image,
        authorUserId: authorUserId
      });
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getUserPosts(userId) {
    try {
      const response = await axios.get(`${this.apiUrl}/posts/user/${userId}`);
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async like(userId, targetId) {
    try {
      const response = await axios.post(`${this.apiUrl}/posts/${targetId}/like`, {
        userId
      });
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async unlike(userId, targetId) {
    try {
      const response = await axios.post(`${this.apiUrl}/posts/${targetId}/unlike`, {
        userId
      });
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  async updateUser(text, userId) {
    try {
      const response = await axios.patch(`${this.apiUrl}/users/${userId}`, {
        name: text
      });
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  
  async getLikeStatus(userId, targetId) {
    try {
      const response = await axios.get(`${this.apiUrl}/posts/${targetId}/${userId}/like`);
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPost(postId) {
    try {
      const response = await axios.get(`${this.apiUrl}/posts/${postId}`);
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deletePost(postId) {
    try {
      const response = await axios.delete(`${this.apiUrl}/posts/${postId}`);
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }



  async getInitialTimeline(userId) {
    try {
      const response = await axios.get(
        `${this.apiUrl}/posts/getTimeline/${userId}`
      );
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }


  async getOtherUsers(userId) {
    try {
      const response = await axios.get(
        `${this.apiUrl}/users/suggestions/${userId}`
      );
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async patchUser(userId, name, picture) {
    try {
      const response = await axios.patch(`${this.apiUrl}/users/${userId}`, {
        name: name,
        picture: picture
      });
      if (response.status !== 200) {
        throw new Error(`Request failed ${response}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ApiService();
