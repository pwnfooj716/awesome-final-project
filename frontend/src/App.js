import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import NewsFeedContainer from './containers/NewsFeedContainer';
import { Layout } from "antd";
import "./styles/App.css";

class App extends Component {
  render() {
    return (
      <Layout>
        <NavBar />
        <NewsFeedContainer />
      </Layout>
    );
  }
}

export default App;
