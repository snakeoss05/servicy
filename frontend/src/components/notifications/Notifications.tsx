import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./notifications.scss";
import { useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [display, setDisplay] = useState(false);
  const io: any = useRef();
  io.current = socket;
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    io.current.on("notification", (notification) => {
      // Check if the notification is already in the state
      const isNotificationExists = notifications.some(
        (n) => n.id === notification.id
      );
      if (!isNotificationExists) {
        setNotifications((oldarray) => [...oldarray, notification]);
        const audio = new Audio(
          "../../assets/sounds/mixkit-positive-notification-951.wav"
        );
        audio.volume = 0.1;
        audio.play();
        const notificatione = new Notification("new notification", {
          body: notification.message,
          icon: notification.profileimg,
        });
        if (notificatione) {
          notificatione;
        }
      }
    });
    return () => {
      io.current.off("notification");
    };
  }, [notifications]);
  useEffect(() => {
    const getNotfications = async () => {
      const resp = await axios.get(
        `http://localhost:8000/api/service/notfications/${user.userid}`
      );
      setNotifications(resp.data);
      console.log(resp);
    };
    getNotfications();
  }, []);
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
  /* const deleteNotification = async (e, notificationId) => {
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
*/
  const deleteNotification = async (e, notificationId) => {
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
