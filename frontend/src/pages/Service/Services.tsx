/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./services.scss";
import jsonData from "../../data/tn.json";
import StarRating from "../../components/StarRatings";
import Card from "../../components/cards/card";
import axios from "axios";
import { useParams } from "react-router-dom";
import categorysList from "../../data/categorys";
interface users {
  userid: string;
  phonenumber: number;
  title: string;
  avg_rating: number;
  firstname: string;
  lastname: string;
  profileimg: string;
}

export default function Services() {
  const [users, setUsers] = useState<users[]>([]);
  const [selectedCity, setSelectcity] = useState("");
  const [selectedGov, setselectedGov] = useState("");
  const [jobtype, setjobtype] = useState("");
  const [rating, setRating] = useState(0);
  const { category } = useParams();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const getuserlistByCategory = async () => {
    try {
      const respond = await axios.get(
        `http://localhost:8000/api/service/getcategory/${category}
`
      );
      setUsers(respond.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getuserlistByCategory();
  }, [category]);
  const FilterUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/service/filter?category=${category}&city=${selectedCity}&address=${selectedGov}&name=${jobtype}&rating=${rating}
`
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }

    setSelectcity("");
    setselectedGov("");
    setjobtype("");
    setRating(0);
  };

  const uniquecities = [...new Set(jsonData.map((obj: any) => obj.admin_name))];
  const listofGov = jsonData.filter((obj) => obj.admin_name === selectedCity);

  return (
    <div id="services">
      <div className="carouselContain">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper">
          <SwiperSlide>
            <img
              src="../../assets/carousel/handyman-in-yellow-uniform-works-with-electricity-2021-09-01-02-49-06-utc-1.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img src="../../assets/carousel/Sans-titre-2.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="seprate">
        <div className="topRated">
          <h3>أعلى تقيما</h3>
        </div>
        <div>
          <div className="filterBar">
            <div className="formGroup">
              <label htmlFor="ville">الولاية</label>
              <div className="customSelect">
                <p>{selectedCity ? selectedCity : "tunis"}</p>
                <span>▲</span>
                <ul>
                  {uniquecities.map((city, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          setSelectcity(city);
                        }}>
                        {city}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="address">الدائرة البلدية</label>
              <div className="customSelect">
                <p>{selectedGov ? selectedGov : "délégation"} </p>
                <span>▲</span>
                <ul>
                  {listofGov.map((gov, index) => {
                    return (
                      <li key={index} onClick={() => setselectedGov(gov.city)}>
                        {gov.city}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="category">نوع الخدمة</label>
              <div className="customSelect category">
                <p>{jobtype}</p>
                <span>▲</span>
                <ul>
                  {categorysList[category].map((value, index) => (
                    <li key={index} onClick={() => setjobtype(value)}>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="category">التقيم</label>

              <div className="starsP">
                {" "}
                <StarRating
                  totalStars={5}
                  initialRating={rating}
                  onRatingChange={handleRatingChange}
                />{" "}
                <p>{rating} </p>
              </div>
            </div>

            <button onClick={FilterUsers}>
              <span>البحث</span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="listp">
            {users?.map((user) => {
              return <Card user={user} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
