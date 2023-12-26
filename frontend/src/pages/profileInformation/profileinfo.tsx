import React, { useState, useEffect } from "react";
import "./profileinfo.scss";
import { useSelector } from "react-redux";
import StarRating from "../../components/StarRatings";

export default function Profileinfo() {
  const [rating, setRating] = useState(0);

  function stars(n: number) {
    const starSymbol = String.fromCharCode(9733);

    return <span>{starSymbol.repeat(n)}</span>;
  }

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div id="profileinfo">
      <div className="profile">
        <div className="headerprofile">
          <div className="lefprofile">
            <img
              src="https://img.icons8.com/bubbles/100/000000/user.png"
              className="img-radius"
              alt="User-Profile-Image"></img>
            <p>أحمد زكري</p>
            <span>تقني كهرباء</span>
          </div>
          <div className="rightprofile">
            <div>
              <div className="h2">معطيات</div>
              <div>
                <div className="h6">رقم الهاتف</div>
                <p>24365648</p>
              </div>
              <div>
                <div className="h6">بريد ألكتروني</div>
                <p>ahmed.zekri@gmail.com</p>
              </div>
              <div>
                <div className="h6">التقيم</div>
                <div className="h1">5.0/5 </div>
                <div className="h4">{stars(5)} </div>
              </div>
            </div>
          </div>
        </div>
        <div className="examplePhoto">
          <div className="h2">مثال لبعض مشاريع</div>
          <div className="imgcontainer">
            <img
              src="../../assets/New folder/281ca337-000_couverture_lat04_1920x1080-1200x675.jpg"
              alt="exp"
            />
            <img
              src="../../assets/New folder/281ca337-000_couverture_lat04_1920x1080-1200x675.jpg"
              alt="exp"
            />
            <img
              src="../../assets/New folder/281ca337-000_couverture_lat04_1920x1080-1200x675.jpg"
              alt="exp"
            />
          </div>
          <div className="reviews">
            <div className="h2">تقيم الخدمات</div>
            <div className="reviewcontainer">
              <div className="review">
                <div className="icon-profile">
                  <img
                    src="https://img.icons8.com/bubbles/100/000000/user.png"
                    className="img-radius"
                    alt="User-Profile-Image"
                  />
                  <p>Mourad manai</p>
                </div>

                <span>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint
                  ab repellendus cum aperiam, maiores laboriosam nam esse quod
                  corporis corrupti a fugit aliquid assumenda, sapiente beatae,
                  voluptate iusto aut doloremque.
                </span>
              </div>
            </div>
            {isAuthenticated ? (
              <div className="sendReview">
                <button>أرسال</button>
                <div>
                  <StarRating
                    totalStars={5}
                    initialRating={rating}
                    onRatingChange={handleRatingChange}
                  />
                  <input name="comment" />
                </div>

                <div className="icon-profile">
                  <img
                    src="https://img.icons8.com/bubbles/100/000000/user.png"
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
