import React, { useState } from "react";
import Modal from "../ModalBox/ModalBox";
import Profileinfo from "../../pages/profileInformation/profileinfo";
import axios from "axios";
import Loading from "../loading/Loading";

export default function Card(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullInfo, setfullInfo] = useState();
  const [reviews, setReviews] = useState();
  const openModal = async () => {
    setIsModalOpen(true);
    fetchItems();
    fetchReviews();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function stars(n: number) {
    const numberofStars = Math.ceil(n);
    const starSymbol = String.fromCharCode(9733);

    return <span>{starSymbol.repeat(numberofStars)}</span>;
  }
  const fetchItems = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:8000/api/service/fullinfo/${props.user.userid}`
      );

      setfullInfo(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchReviews = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:8000/api/service/reviews/${props.user.serviceid}`
      );

      setReviews(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="containerCard">
        <div className="cadre">
          <img
            src={
              props.user.profileimg
                ? props.user.profileimg
                : "https://img.icons8.com/bubbles/100/000000/user.png"
            }
            alt="profileimg"></img>
          <h4>
            {props.user.firstname} {props.user.lastname}
          </h4>
          <button onClick={openModal}>مزيد من تفاصيل </button>
        </div>
        <div className="descrep">
          <span>{props.user.servicename}</span>
          <div>
            <span>
              {props.user.avg_rating} {stars(props.user.avg_rating)}
            </span>
            <h4>التقيم</h4>
          </div>
          <div>
            <h4>{props.user.phonenumber}</h4>
            <i className="fa-solid fa-phone"></i>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {fullInfo ? (
          <Profileinfo users={fullInfo} reviews={reviews} />
        ) : (
          <Loading />
        )}
      </Modal>
    </div>
  );
}
