import React, { useState } from "react";
import "./card.scss";
import Modal from "../ModalBox/ModalBox";
import Profileinfo from "../../pages/profileInformation/profileinfo";
import axios from "axios";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";

export default function Card(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullInfo, setfullInfo] = useState();
  const [heart, setheart] = useState(false);
  const [reviews, setReviews] = useState([]);
  const openModal = async () => {
    setIsModalOpen(true);
    fetchItems();
    fetchReviews();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div>
      <div className="containerCard">
        <Link to={`/profile/${props.user.serviceid}`}>
          <div className="cadre" onClick={openModal}>
            <i
              className="fa-solid fa-heart"
              style={{ color: heart ? "orangered" : "white" }}
              onClick={(e) => setheart(!heart)}></i>
            <img
              src={
                props.user.profileimg
                  ? props.user.profileimg
                  : "../../assets/random people/aaabd8124118091.6100db98b1bd4.png"
              }
              alt="profileimg"></img>
            <div className="name">
              <h4>
                {props.user.firstname} {props.user.lastname}
              </h4>
              <p>
                {props.user.address},{props.user.city}
              </p>
            </div>
          </div>
        </Link>
        <div className="descrep">
          <span>{props.user.servicename}</span>
          <div>
            <img src="../../assets/icons/etoile_on.svg" alt="etoile" />
            <span>{props.user.avg_rating}</span>
            <p>({props.user.rating_count} تقيم)</p>
            <img
              src="../../assets/icons/ambassador-sparkle.svg"
              alt="sparkle"
            />
          </div>
          <p className="descreption">
            professeur indépendant donne des cours de python et d'aide aux
            projets informatiques
          </p>
          <p className="price">20dt/h</p>
        </div>
      </div>
    </div>
  );
}
