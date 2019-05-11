import React, { Component } from "react";
import firebaseConfig from "../config/firebaseConfig";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  login = newUser => {
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        console.log("login success");
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.login(this.state);
    console.log(this.state);
  };
  render() {
    const divStyle = {
      margin: "100px",
      border: "5px solid pink"
    };
    return (
      <div className="container" style={divStyle}>
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-zero">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
