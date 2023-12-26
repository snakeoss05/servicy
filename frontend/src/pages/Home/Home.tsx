import React, { Component } from "react";
import "./Home.scss";
export default class HomeC extends Component {
  render() {
    return (
      <div id="Home">
        <h1>حرت ومعرفتش لشكون تمشي مع سرفيسي يلقالك الحل</h1>
        <div className="HeaderImg">
          <img src="../../assets/background.png" alt="homeImg" />
        </div>
      </div>
    );
  }
}
