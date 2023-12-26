import React, { useState } from "react";
import "./profile.scss";
import ProfileSettings from "./profileSettings/ProfileSettings";
import { useSelector } from "react-redux";
import CreateService from "./CreateService/CreateService";
export default function Profile() {
  const [tabs, setTabs] = useState("profileSettings");
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div id="profile">
      <div className="leftprofile">
        {tabs === "profileSettings" && <ProfileSettings />}
        {tabs === "provideService" && <CreateService />}
      </div>
      <div className="rightprofile">
        <div>
          <img
            src={
              user.profileimg
                ? user.picture
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
          <li>
            {" "}
            <a>تعديل الخدمات </a>
            <i className="fa-regular fa-address-card"></i>
          </li>
          <li onClick={() => setTabs("provideService")}>
            <a>تقديم خدمة</a>
            <i className="fa-solid fa-briefcase"></i>
          </li>
          <li>
            <a>التقيم</a>
            <i className="fa-solid fa-star-half-stroke"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}
