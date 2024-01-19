import React, { useState, useEffect } from "react";
import "./profileinfo.scss";
import { useSelector } from "react-redux";
import StarRating from "../../components/StarRatings";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";

export default function Profileinfo() {
  const { serviceid } = useParams();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const user = useSelector((state: RootState) => state.auth.user);
  const [rating, setRating] = useState(0);
  const [reviewlist, setReviewlist] = useState();
  const [users, setUsers] = useState();
  const [newreview, setNewreview] = useState({
    profileimg: user.profileimg,
    firstname: user.firstname,
    lastname: user.lastname,
    userid: user.userid,
    serviceid: serviceid,
    rating: rating,
    comment: "",
    timestamp: new Date(),
  });
  function stars(n: number) {
    const starSymbol = String.fromCharCode(9733);

    return <span>{starSymbol.repeat(n)}</span>;
  }
  const fetchItems = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:8000/api/service/fullinfo/${serviceid}`
      );

      setUsers(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchReviews = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:8000/api/service/reviews/${serviceid}`
      );

      setReviewlist(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
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
    fetchItems();
    fetchReviews();
  }, [serviceid]);

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

  const addReview = async (ratedid) => {
    setNewreview((state) => ({
      ...state,
      ratedid: ratedid,
    }));
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/service/addreview",
        newreview
      );
      console.log(resp);
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

  return users ? (
    <div id="profileinfo" className={darkMode && "css-selector"}>
      <div className="profile">
        <div className="headerprofile">
          <div className="lefprofile">
            <i className="fa-solid fa-heart"></i>
            <img
              src={users[0].profileimg}
              className="img-radius"
              alt="User-Profile-Image"></img>
            <div className="rate">
              <img src="../../assets/icons/etoile_on.svg" />
              <p>{users[0].avg_rating}</p>{" "}
              <span>({users[0].rating_count} تقيم)</span>
            </div>

            <p>
              {users[0].firstname} {users[0].lastname}
            </p>
            <span>{users[0].name}</span>
            <button>تواصل</button>
          </div>
          <div className="rightprofile">
            <div>
              <div className="h2">معطيات التواصل</div>
              <div>
                <div className="h6">رقم الهاتف</div>
                <p>{users[0].phonenumber}</p>
              </div>
              <div>
                <div className="h6">بريد ألكتروني</div>
                <p>{users[0].email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="examplePhoto">
          <div className="h2">مثال لبعض مشاريع</div>
          <div className="imgcontainer">
            <img src={users[0].image1} alt="exp" />
          </div>
          <div className="reviews">
            <div className="h2">تقيم الخدمات</div>
            <div className="reviewcontainer">
              {reviewlist?.map((review) => {
                return (
                  <div className="review" key={review.reviewid}>
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

                      <div className="comment">{review.comment}</div>
                      <p className="date">{ConvertTime(review.timestamp)}</p>
                      {review.heart && (
                        <i className="fa-solid fa-heart fa-beat"></i>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {isAuthenticated ? (
              <div className="sendReview">
                <button onClick={() => addReview(users.userid)}>أرسال</button>
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
  ) : (
    <Loading />
  );
}
