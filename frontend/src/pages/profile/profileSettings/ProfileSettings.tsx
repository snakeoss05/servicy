import React, { useState } from "react";
import "./profilesettings.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/actions/authActions";
export default function ProfileSettings() {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const [filealert, setfilealert] = useState(false);
  const [profile, setProfile] = useState({
    id: user.userid,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    picture: "",
  });
  function handleInputsChanges(e: any) {
    const { name, value } = e.target;
    setProfile((prevstate) => ({ ...prevstate, [name]: value }));
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setfilealert(true);
      const timeoutId = setTimeout(() => {
        setfilealert(false);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setProfile({ ...profile, picture: file });
    }
  };

  const updatePrfoile = async () => {
    try {
      const formData = new FormData();
      formData.append("picture", profile.picture);
      formData.append("id", profile.id);
      formData.append("firstname", profile.firstname);
      formData.append("lastname", profile.lastname);
      formData.append("email", profile.email);
      formData.append("password", profile.password);
      const response = await axios.put(
        "http://localhost:8000/api/user/update",
        formData
      );
      console.log(response.data);
      if (response.status === 200 && response.data) {
        dispatch(updateUser(response.data)); // Dispatch the action with the plain object.
      } else {
        // Handle non-200 status or missing data response as needed.
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div id="profileSettings">
      <h4>تعديل الحساب</h4>
      <div>
        <label className="custom-file-upload">
          <input type="file" name="picture" onChange={handleFileChange} />
          حمل صورة الشخصية
          <i className="fa-solid fa-image"></i>
        </label>
        {filealert && <p>يجب ألا تتجاوز الصورة حجم 2 ميجا</p>}
        <div className="displayGrid">
          <div className="row">
            <div className="groupField">
              <label htmlFor="firstname">الأسم</label>
              <input
                type="text"
                name="firstname"
                value={user.firstname}
                onChange={handleInputsChanges}
                placeholder="الأسم"
              />
            </div>
            <div className="groupField">
              <label htmlFor="lastname">اللقب</label>
              <input
                type="text"
                name="lastname"
                value={user.lastname}
                onChange={handleInputsChanges}
                placeholder="اللقب"
              />
            </div>
          </div>

          <div className="groupField ">
            <label htmlFor="email">بريد الألكتوني</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputsChanges}
              placeholder="بريد الألكترني"
            />
          </div>

          <div className="groupField ">
            <label htmlFor="email">كلمة الدخول</label>
            <input
              type="password"
              name="password"
              onChange={handleInputsChanges}
              placeholder="كلمة الدخول"
            />
          </div>

          <button onClick={updatePrfoile}>تحديث</button>
        </div>
      </div>
    </div>
  );
}
