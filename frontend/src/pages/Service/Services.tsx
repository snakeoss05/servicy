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
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const [users, setUsers] = useState<users[]>([]);
  const [selectedCity, setSelectcity] = useState("");
  const [selectedGov, setselectedGov] = useState("");
  const [jobtype, setjobtype] = useState("");
  const [rating, setRating] = useState(0);

  const { category } = useParams();
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const fetchItems = async () => {
    axios
      .get<users[]>(`http://localhost:8000/api/service/getcategory/${category}`)
      .then((response) => {
        setUsers(response.data);
      });
  };
  useEffect(() => {
    fetchItems();
  }, [category]);
  const FilterUsers = async () => {
    axios
      .get(
        `http://localhost:8000/api/service/filter?city=${selectedCity}&address=${selectedGov}&name=${jobtype}&rating=${rating}
`
      )
      .then((response) => {
        setUsers(response.data);
      });
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
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
      </div>
      <div className="seprate">
        <div className="topRated">
          <h3>أعلى تقيما</h3>
          <div className="containerCard">
            <div className="cadre">
              <img
                src="../../assets/random people/247-2479526_round-profile-picture-png-transparent-png.png"
                alt=""></img>
              <h4>محمود عياري</h4>
            </div>
            <div className="descrep">
              <span>تقني كهرباء</span>
              <div>
                <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <p>التقيم</p>
              </div>
              <div>
                <h4>24365648</h4>
                <i className="fa-solid fa-phone"></i>
              </div>
            </div>
          </div>
          <div className="containerCard">
            <div className="cadre">
              <img
                src="../../assets/random people/pexels-italo-melo-2379004.jpg"
                alt=""></img>
              <h4>محمود عياري</h4>
            </div>
            <div className="descrep">
              <span>تقني كهرباء</span>
              <div>
                <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <p>التقيم</p>
              </div>
              <div>
                <h4>24365648</h4>
                <i className="fa-solid fa-phone"></i>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="filterBar">
            <div className="formGroup">
              <label htmlFor="ville">الولاية</label>
              <div className="customSelect">
                <p>{selectedCity ? selectedCity : "tunis"}</p>
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
              <div className="customSelect">
                <p>{jobtype}</p>
                <ul>
                  {categorysList["technicien"].map((value, index) => (
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
              <span>FILTRER</span>
              <i className="fa-solid fa-filter"></i>
            </button>
          </div>
          <div className="listp">
            {users.map((user) => {
              return <Card user={user} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
