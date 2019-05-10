import React, { Component } from "react";
import Layout, { Content } from "antd/lib/layout";
import NewFeed from "../components/NewFeed";
import SideInfoBar from "../components/SideInfoBar";

class NewsFeedContainer extends Component {
  render() {
    return (
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div
          style={{
            margin: "50px 0",
            padding: 24,
            minHeight: "100vh"
          }}
        >
          <Layout>
            <Content>
              <NewFeed />
            </Content>
            <SideInfoBar />
          </Layout>
        </div>
      </Content>
    );
  }
}

export default NewsFeedContainer;
