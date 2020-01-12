import React, { Component } from "react";
import ShortUrl from "../components/ShortUrl";
import Header from "../components/Header";
import "./../styles/style.less";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* <SiderMenu /> */}
        <ShortUrl />
      </div>
    );
  }
}
