import React, { useEffect, useState } from "react";
import "./darkmodebtn.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/actions/darkmodeActions";

export default function DarkModeBtn() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const toggleMode = () => {
    dispatch(toggleDarkMode());
    console.log("Dark mode toggled. New state:", darkMode);
  };

  return (
    <label htmlFor="theme" className="theme">
      <span className="theme__toggle-wrap">
        <input
          id="theme"
          className="theme__toggle"
          type="checkbox"
          role="switch"
          onChange={toggleMode}
          name="theme"
          checked={darkMode}
        />
        <span className="theme__fill" />
        <span className="theme__icon">
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
        </span>
      </span>
    </label>
  );
}
