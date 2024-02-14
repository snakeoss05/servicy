import React, { useEffect, useRef, useState } from "react";
import "./oldchat.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { socket } from "../../socket";
export default function OldChat() {
  const user = useSelector((state: any) => state.auth.user);
  const [selectedUser, setselectedUser] = useState();
  const [conversation, setconversation] = useState(
    JSON.parse(sessionStorage.getItem("conversation")) || []
  );
  const [filterConv, setfilterConv] = useState();

  const uniqueUser = conversation.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => o.reciverid === obj.reciverid)
  );

  async function getListofPeople() {
    const res = await axios.get(
      `http://localhost:8000/api/chat/getMymessage/${user.userid}`
    );
    setconversation(res.data);
    console.log(res.data);
  }
  useEffect(() => {
    const listM = conversation.filter((o) => {
      o.reciverid === selectedUser;
    });
    setfilterConv(listM);
  }, [conversation, selectedUser]);
  console.log(filterConv);
  return (
    <div className="containerUsers">
      <button onClick={getListofPeople}>get my list</button>
      <div className="listUsers">
        {uniqueUser.map((user) => (
          <div
            className="profile"
            onClick={() => setselectedUser(user.reciverid)}>
            <img
              src={user.profileimg}
              className="img-radius"
              alt="User-Profile-Image"
            />
            <p>
              {user.firstname} {user.lastname}
            </p>
          </div>
        ))}
      </div>
      <div className="body">
        {filterConv?.map((list) => (
          <div>
            <p>{list.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
