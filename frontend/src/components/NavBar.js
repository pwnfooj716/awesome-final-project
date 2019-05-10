import React, { Component } from "react";
import logo from "../resources/logo.svg";
import { Menu, Icon, Avatar } from "antd";

class NavBar extends Component {
  render() {
    return (
      <div
        style={{
          background: "#fff",
          position: "fixed",
          zIndex: 1,
          width: "100%"
        }}
      >
        <img src={logo} className="logo" alt="logo" />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          style={{ lineHeight: "64px", width: "100%" }}
        >
          <Menu.SubMenu
            title={
              <Avatar
                size="large"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            }
            style={{ float: "right" }}
          >
            <Menu.Item key="setting:1">View Profile</Menu.Item>
            <Menu.Item key="setting:3">Settings</Menu.Item>
            <Menu.Item key="setting:4">Logout</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="network" style={{ float: "right" }}>
            <Icon type="team" />
            <span className="nav-text">My Network</span>
          </Menu.Item>
          <Menu.Item key="home" style={{ float: "right" }}>
            <Icon type="appstore" />
            <span className="nav-text">Home</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default NavBar;
