import { Menu, Icon } from "antd";
import React from "react";

class SiderMenu extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item>Home</Menu.Item>
        <Menu.Item>URL statistics</Menu.Item>
        <Menu.Item>About Us</Menu.Item>
      </Menu>
    );
  }
}

export default SiderMenu;
