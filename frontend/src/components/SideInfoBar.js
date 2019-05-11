import React, { Component } from "react";
import { Avatar } from "antd";
import Sider from "antd/lib/layout/Sider";

class SideInfoBar extends Component {
  render() {
    return (
      <Sider>
        <span>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="large" />
        User Name
        </span>
      </Sider>
    );
  }
}

export default SideInfoBar;
