import axios from "axios";

class ApiService {
  constructor() {
    this.apiUrl = "http://localhost:3030/api";
  }

  async login(tokenId) {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        tokenId: tokenId
      });
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getProfile(userId) {
    try {
      const response = axios.get(`${apiUrl}/users/profile/?userId=${userId}`);
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async follow(userId, targetId) {
    try {
      const response = axios.post(`${apiUrl}/users/follow`, {
        userId: userId,
        targetId: targetId
      });
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async unFollow(userId, targetId) {
    try {
      const response = axios.post(`${apiUrl}/users/unfollow`, {
        userId: userId,
        targetId: targetId
      });
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollower(userId, startIndex, limit = 20) {
    try {
      const response = axios.get(
        `${apiUrl}/users/follower/?userId=${userId}&startIndex=${startIndex}&limit=${limit}`
      );
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollowerCount(userId) {
    try {
      const response = axios.get(
        `${apiUrl}/users/followerCount/?userId=${userId}`
      );
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollowing(userId, startIndex, limit = 20) {
    try {
      const response = axios.get(
        `${apiUrl}/users/following/?userId=${userId}&startIndex=${startIndex}&limit=${limit}`
      );
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollowingCount(userId) {
    try {
      const response = axios.get(
        `${apiUrl}/users/followingCount/?userId=${userId}`
      );
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async addPost(text, image, authorUserId) {
    try {
      const response = axios.post(`${apiUrl}/posts`, {
        text: text,
        image: image,
        authorUserId: authorUserId
      });
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPost(postId) {
    try {
      const response = axios.get(`${apiUrl}/posts/?postId=${postId}`);
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deletePost(postId) {
    try {
      const response = axios.delete(`${apiUrl}/posts/?postId=${postId}`);
      if (response.status !== 200) {
        throw `Request failed ${response}`;
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ApiService();
