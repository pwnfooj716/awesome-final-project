import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import NewsFeedContainer from './containers/NewsFeedContainer';
import { Layout } from "antd";
import "./styles/App.css";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (<BrowserRouter>
      <Layout>
        <NavBar/>
        <Switch>
            <Route exact path='/'component={NewsFeedContainer} />
            <Route path='/signintest' component={SignIn} />
            <Route path='/signuptest' component={SignUp} />
        </Switch>
      </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
