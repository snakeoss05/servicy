import React, { useEffect, useState } from "react";
import "./profile.scss";
import ProfileSettings from "./profileSettings/ProfileSettings";
import { useSelector } from "react-redux";
import CreateService from "./CreateService/CreateService";
import Rating from "./rating/Rating";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import OldChat from "../../components/chat/OldChat";
export default function Profile() {
  const { tab } = useParams();
  const [tabs, setTabs] = useState("profileSettings");
  const [reviews, setReviews] = useState([]);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (tab) {
      setTabs(tab);
    }
  }, [tab]);
  const fetchReviews = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:8000/api/service/getbyid/${user.userid}`
      );

      setReviews(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  function askNotificationPermission() {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    Notification.requestPermission();
  }
  useEffect(() => {
    if (Notification.permission !== "granted") {
      askNotificationPermission();
    }
  }, []);
  return (
    <div id="profile" className={darkMode && "dark-mode"}>
      <div className="leftprofile">
        {tabs === "profileSettings" && <ProfileSettings />}
        {tabs === "provideService" && <CreateService />}
        {tabs === "rating" && <Rating reviews={reviews} />}
        {tabs === "chat" && <OldChat />}
      </div>
      <div className="rightprofile">
        <div>
          <img
            src={
              user.profileimg
                ? user.profileimg
                : "https://img.icons8.com/bubbles/100/000000/user.png"
            }
            className="img-radius"
            alt="User-Profile-Image"></img>

          <p>
            {user.firstname} {user.lastname}
          </p>
          <span>userid#{user.userid}</span>
        </div>

        <ul>
          <li onClick={() => setTabs("profileSettings")}>
            <a>تعديل المعطيات الشخصية </a>
            <i className="fa-regular fa-user"></i>
          </li>

          <li onClick={() => setTabs("provideService")}>
            <a>تقديم خدمة</a>
            <i className="fa-solid fa-briefcase"></i>
          </li>
          <li
            onClick={() => {
              setTabs("chat");
            }}>
            <a>محادت</a>
            <i className="fa-regular fa-message"></i>
          </li>
          <li>
            {" "}
            <a>تعديل الخدمات </a>
            <i className="fa-regular fa-address-card"></i>
          </li>
          <li
            onClick={() => {
              fetchReviews();
              setTabs("rating");
            }}>
            <a>التقيم</a>
            <i className="fa-solid fa-star-half-stroke"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}
