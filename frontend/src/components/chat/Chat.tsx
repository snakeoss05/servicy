import React, { useEffect, useRef, useState } from "react";
import "./chat.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { socket } from "../../socket";
export default function Chat(props) {
  const user = useSelector((state: any) => state.auth.user);
  const io: any = useRef();
  io.current = socket;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [conversation, setconversation] = useState(
    JSON.parse(sessionStorage.getItem("conversation")) || []
  );

  const scrollRef: any = useRef();

  useEffect(() => {}, []);
  function ConvertTime(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const dateObject = new Date(date);

    const formattedDate = dateObject.toLocaleString("en-FR", options);
    return formattedDate;
  }
  const sendMessage = async () => {
    try {
      const dataUser = {
        message: inputValue,
        user,
        sender: true,
        date: new Date(),
        
        senderID: user.userid,
        reciverID: props.users.userid,
      };
      setconversation((oldarray) => [...oldarray, dataUser]);
      sessionStorage.setItem("conversation", JSON.stringify(conversation));
      await axios.post("http://localhost:8000/api/chat/sendMessage", dataUser);
      setInputValue("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    io.current.on("messageRoam", (data) => {
      setconversation((oldarray) => [...oldarray, data]);
      sessionStorage.setItem("conversation", JSON.stringify(conversation));
    });
    return () => {
      io.current.off("messageRoam");
    };
  }, [setconversation]);
  useEffect(() => {
    sessionStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);
  return (
    <div className="contact">
      <div className="profileH">
        <img
          src={props.users.profileimg}
          className="img-radius"
          alt="User-Profile-Image"
        />
        <p>
          {props.users.firstname} {props.users.lastname}
        </p>
      </div>
      <div className="chat">
        {conversation.map((data, index) => (
          <div
            className={`review ${data.sender && "reverse"}`}
            key={index}
            ref={scrollRef}>
            <div className="icon-profile">
              <img
                src={data.sender ? user.profileimg : props.users.profileimg}
                className="img-radius"
                alt="User-Profile-Image"
              />
              <p>
                {data.sender
                  ? user.firstname + " " + user.lastname
                  : props.users.firstname + " " + props.users.lastname}
              </p>
            </div>

            <div className="sidechat">
              <p className="comment">{data.message}</p>
              <p className="date">
                {ConvertTime(data.sender ? data.date : data.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="send">
        <input type="text" onChange={(e) => setInputValue(e.target.value)} />
        <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
      </div>
    </div>
  );
}
