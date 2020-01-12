import React, { Component } from "react";
import { PageHeader, Button } from "antd";
import logo from "./../images/logo.png";
import history from "../service/history";
import { routes } from "../constants";
import "./../styles/style.less";

export class Header extends Component {
  goToRoute = route => () => {
    console.log(route);
    history.push(route);
  };

  render() {
    const { homeRoute, statisticsRoute, aboutUsRoute } = routes;

    return (
      <PageHeader
        ghost={true}
        extra={[
          <Button key="1" onClick={this.goToRoute(homeRoute)}>
            Home
          </Button>,
          <Button key="2" onClick={this.goToRoute(statisticsRoute)}>
            URL statistics
          </Button>,
          <Button key="3" onClick={this.goToRoute(aboutUsRoute)}>
            About Us
          </Button>,
          <img key="4" className="logo-image" src={logo} alt="Pocket URL" />
        ]}
      />
    );
  }
}

export default Header;
