import axios from "axios";

class ApiService {
  constructor() {
    this.apiUrl = "http://localhost:3030/";
  }

  async login(tokenId) {
    return await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async getProfile(userId) {
    return await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async follow(userId, targetId) {
    let result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async unFollow(userId, targetId) {
    let result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async getFollower(userId, startIndex, limit = 20) {
    let result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async getFollowerCount(userId) {
    let result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async getFollowing(userId, startIndex, limit = 20) {
    let result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async getFollowingCount(userId) {
    let result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async addPost(text, image, authorUserId) {
    let createdData = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async getPost(postId) {
    let createdData = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async deletePost(postId) {
    let createdData = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }

  async deletePost(postId) {
    let createdData = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`
    );
  }
}

export default new ApiService();
