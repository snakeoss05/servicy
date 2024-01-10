import React, { useState } from "react";
import axios from "axios";
import "./rating.scss";
import { useSelector } from "react-redux";
export default function Rating(props: any) {
  const [reaction, setReaction] = useState({
    heart: false,
    report: false,
  });
  const user = useSelector((state: any) => state.auth.user);
  function stars(n: number) {
    const starSymbol = String.fromCharCode(9733);

    return <span>{starSymbol.repeat(n)}</span>;
  }

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

  const sendreaction = async (id, userid) => {
    try {
      setReaction((state) => ({
        ...state,
        heart: true,
        reviewid: id,
        userid: userid,
        user: user,
      }));
      const resp = await axios.put(
        `http://localhost:8000/api/service/addreaction`,
        reaction
      );
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div id="reviewcontainer">
      {props.reviews?.map((review) => {
        return (
          <div className="review">
            <div className="icon-profile">
              <img
                src={
                  review.profileimg
                    ? review.profileimg
                    : "https://img.icons8.com/bubbles/100/000000/user.png"
                }
                className="img-radius"
                alt="User-Profile-Image"
              />
              <p>
                {review.firstname} {review.lastname}
              </p>
            </div>

            <div className="sidechat">
              <div>
                <span className="rating">{review.rating}/5.0</span>
                <span className="stars">{stars(review.rating)}</span>
              </div>

              <p className="comment">{review.comment}</p>
              <p className="date">{ConvertTime(review.timestamp)}</p>
            </div>
            <div className="reaction">
              <i
                className="fa-solid fa-heart"
                onClick={() =>
                  sendreaction(review.reviewid, review.userid)
                }></i>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}
