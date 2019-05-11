import React, { Component } from "react";
import { Icon, Avatar, Card } from "antd";
import { Meta } from "antd/lib/card";

class NewFeed extends Component {
  render() {
    return (
      <Card
        style={{ width: 900, marginBottom: "70px" }}
        title={
          <span>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            User Name
          </span>
        }
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <Icon type="heart" />,
          <Icon type="message" />,
          <Icon type="share-alt" />
        ]}
      >
        <Meta title="Card title" description="This is the description" />
      </Card>
    );
  }
}

export default NewFeed;
