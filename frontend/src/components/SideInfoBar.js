import React, { Component } from "react";
import { Menu, Avatar } from "antd";
import Sider from "antd/lib/layout/Sider";

class SideInfoBar extends Component {
  render() {
    return (
      <Sider width={400} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
        >
          <Menu.Item key="sub1">
            <span>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              User Name
            </span>
          </Menu.Item>
        </Menu>
        {/* Add friend/ network card */}
      </Sider>
    );
  }
}

export default SideInfoBar;
