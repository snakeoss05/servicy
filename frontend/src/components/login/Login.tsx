/* eslint-disable @typescript-eslint/no-explicit-any */
import "./login.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { redirect } from "react-router-dom";
import { connectSocket } from "../../socket";
export default function Login() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [logform, setlogform] = useState({
    email: "",
    password: "",
  });
  const [verificationMessage, setVerificationMessage] = useState("");

  function HandleChange(event: any) {
    const { name, value } = event.target;
    setlogform((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }

  const loginform = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        logform
      );

      dispatch(login({ token: response.data.token, user: response.data.user }));
      connectSocket(response.data.user.userid);
      redirect("/profile");
    } catch (error: any) {
      setVerificationMessage(error.response.data);
      const timeoutId = setTimeout(() => {
        setVerificationMessage("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  };
  return (
    <div className={`container ttr ${darkMode && "dark-mode"}`}>
      <div className="left">
        <div className="header">
          <h2 className="animation a1">مرحبًا بعودتك</h2>
          <h4 className="animation a2">
            قم بتسجيل الدخول إلى حسابك باستخدام البريد الإلكتروني وكلمة المرور
          </h4>
        </div>
        <form className="form" onSubmit={loginform}>
          <input
            type="email"
            className="form-field animation a3"
            placeholder="البريد ألكتروني"
            onChange={HandleChange}
            name="email"
          />
          <input
            type="password"
            className="form-field animation a4"
            placeholder="كلمة المرور"
            onChange={HandleChange}
            name="password"
          />
          <p className="animation a5">
            <a href="#">! نسيت كلمة السر</a>
          </p>
          <button className="animation a6" type="submit">
            تسجيل الدخول
          </button>
          {verificationMessage && (
            <div
              className={`alert alert-danger  ${
                verificationMessage && "alertfadeup"
              }`}
              style={{ fontSize: "14px" }}
              role="alert">
              {verificationMessage}
            </div>
          )}
        </form>
      </div>
      <div className="right" />
    </div>
  );
}
