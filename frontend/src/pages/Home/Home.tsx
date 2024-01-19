import React, { Component } from "react";
import "./Home.scss";
import { useSelector } from "react-redux";
export default function HomeC() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div id="Home" className={darkMode && "dark-mode"}>
      <h1>حرت ومعرفتش لشكون تمشي مع سرفيسي يلقالك الحل</h1>
      <div className="HeaderImg">
        <img src="../../assets/background.png" alt="homeImg" />
      </div>
    </div>
  );
}
