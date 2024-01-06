import React, { useState, useEffect } from "react";
import "./profileinfo.scss";
import { useSelector } from "react-redux";
import StarRating from "../../components/StarRatings";
import axios from "axios";

export default function Profileinfo(props: any) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [rating, setRating] = useState(0);
  const [reviewlist, setReviewlist] = useState();
  const [newreview, setNewreview] = useState({
    profileimg: user.profileimg,
    userid: user.userid,
    serviceid: props.users[0].serviceid,
    ratedid: props.users[0].userid,
    rating: 0,
    comment: "",
    timestamp: new Date(),
  });
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
  useEffect(() => {
    setReviewlist(props.reviews);
  }, [props.reviews]);
  const handleRatingChange = (newRating: number) => {
    setNewreview((prevstate) => ({
      ...prevstate,
      rating: newRating,
    }));
    setRating(newRating);
  };
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const addReview = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/service/addreview",
        newreview
      );
      setReviewlist((oldarray) => [...oldarray, newreview]);
    } catch (err) {
      console.log(err);
    }
  };

  function HandleChange(event: any) {
    const { name, value } = event.target;
    setNewreview((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  return (
    <div id="profileinfo">
      <div className="profile">
        <div className="headerprofile">
          <div className="lefprofile">
            <img
              src={props.users[0]?.profileimg}
              className="img-radius"
              alt="User-Profile-Image"></img>
            <p>
              {props.users[0]?.firstname} {props.users[0]?.lastname}
            </p>
            <span>{props.users[0]?.name}</span>
          </div>
          <div className="rightprofile">
            <div>
              <div className="h2">معطيات</div>
              <div>
                <div className="h6">رقم الهاتف</div>
                <p>{props.users[0]?.phonenumber}</p>
              </div>
              <div>
                <div className="h6">بريد ألكتروني</div>
                <p>{props.users[0]?.email}</p>
              </div>
              <div>
                <div className="h6">التقيم</div>
                <div className="h1">{props.users[0]?.avg_rating}/5.00</div>
                <div className="h4">{stars(4)} </div>
              </div>
            </div>
          </div>
        </div>
        <div className="examplePhoto">
          <div className="h2">مثال لبعض مشاريع</div>
          <div className="imgcontainer">
            <img src={props.users[0]?.image1} alt="exp" />
          </div>
          <div className="reviews">
            <div className="h2">تقيم الخدمات</div>
            <div className="reviewcontainer">
              {reviewlist?.map((review) => {
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
                      <span className="rating">{review.rating}/5.0</span>
                      <span className="stars">{stars(review.rating)}</span>

                      <p>{review.comment}</p>
                      <p className="date">{ConvertTime(review.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {isAuthenticated ? (
              <div className="sendReview">
                <button onClick={addReview}>أرسال</button>
                <div>
                  <StarRating
                    totalStars={5}
                    initialRating={rating}
                    onRatingChange={handleRatingChange}
                  />
                  <input name="comment" onChange={HandleChange} />
                </div>

                <div className="icon-profile">
                  <img
                    src={user.profileimg}
                    className="img-radius"
                    alt="User-Profile-Image"
                  />
                  <p>
                    {user.firstname} {user.lastname}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
