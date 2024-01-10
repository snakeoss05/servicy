import React, { useState } from "react";
import "./profile.scss";
import ProfileSettings from "./profileSettings/ProfileSettings";
import { useSelector } from "react-redux";
import CreateService from "./CreateService/CreateService";
import Rating from "./rating/Rating";
import axios from "axios";
export default function Profile() {
  const [tabs, setTabs] = useState("profileSettings");
  const [reviews, setReviews] = useState([]);
  const user = useSelector((state: any) => state.auth.user);
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
  return (
    <div id="profile">
      <div className="leftprofile">
        {tabs === "profileSettings" && <ProfileSettings />}
        {tabs === "provideService" && <CreateService />}
        {tabs === "rating" && <Rating reviews={reviews} />}
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
