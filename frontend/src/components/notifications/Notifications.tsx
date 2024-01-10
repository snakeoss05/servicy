import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./notifications.scss";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function Notifications() {
  const socket = useRef();
  const [notifications, setNotifications] = useState([]);
  const [display, setDisplay] = useState(false);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    socket.current = io("http://localhost:8000", { path: "/socket.io" });
    socket.current.on("connect", () => {
      console.log("Connected to the server");
      socket.current.emit("register", user.userid);
    });

    return () => {
      socket.current.off("connect");
      socket.current.disconnect();
    };
  }, []);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/service/notfications/${user.userid}`
        );
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };
    fetchNotifications();
  }, []);
  useEffect(() => {
    socket.current.on("notification", (notfication) => {
      setNotifications((oldarray) => [...oldarray, notfication]);
    });
  }, [setNotifications]);

  function ConvertTime(date) {
    const currentDate = new Date();
    const dateObject = new Date(date);
    const difference = currentDate - dateObject;
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const formattedDate = `il ya ${
      (days !== 0 && days + ` days`) ||
      (hours !== 0 && hours + ` hours`) ||
      (minutes !== 0 && minutes + ` minutes`) ||
      (seconds !== 0 && seconds + ` seconds`)
    } `;
    return formattedDate;
  }
  const deleteNotification = async (e, notificationId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/service/notfications/delete?notificationid=${notificationId}&userid=${user.userid}`
      );

      if (response.data.success) {
        const deletenotification = setTimeout(() => {
          setNotifications((notifications) =>
            notifications.filter(
              (notification) => notification.notificationid !== notificationId
            )
          );
        }, 400);

        return () => {
          clearTimeout(deletenotification);
        };
      } else {
        console.error("Failed to delete the notification.");
      }
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  return (
    <div id="notifactions">
      <i
        className="fa-regular fa-bell"
        style={{
          animationName: notifications.length !== 0 ? "tilt-shaking" : "",
        }}
        onClick={() => setDisplay(!display)}>
        {notifications.length !== 0 && <p>{notifications.length}</p>}
      </i>
      {display && notifications.length !== 0 && (
        <div className="menu">
          {notifications?.map((notfication) => {
            return (
              <div
                className="notif"
                id="notification"
                key={notfication.notificationid}
                onClick={(e) => {
                  e.currentTarget.classList.add("slidetoLeft");
                  deleteNotification(e, notfication.notificationid);
                }}>
                <div className="imgcontainer">
                  <img
                    src={
                      notfication.profileimg
                        ? notfication.profileimg
                        : "https://img.icons8.com/bubbles/100/000000/user.png"
                    }
                    alt="imgprofile"
                    className="img-radius"
                  />
                </div>

                <div className="messt">
                  <p className="name">
                    {notfication.firstname} {notfication.lastname}
                  </p>

                  <p className="message">{notfication.message}</p>

                  <p className="time">{ConvertTime(notfication.created_at)}</p>
                </div>
                <span className="bubble"></span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
