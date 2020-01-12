import React, { Component } from "react";
import Header from "../components/Header";
import "./../styles/style.less";
import UrlClicks from "../components/UrlClicks";

export default class Statistics extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* <SiderMenu /> */}
        <UrlClicks />
      </div>
    );
  }
}
