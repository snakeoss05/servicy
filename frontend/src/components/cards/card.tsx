import React, { useState } from "react";
import Modal from "../ModalBox/ModalBox";
import Profileinfo from "../../pages/profileInformation/profileinfo";

export default function Card(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function stars(n: number) {
    const numberofStars = Math.ceil(n);
    const starSymbol = String.fromCharCode(9733);
    console.log(n, numberofStars);
    return <span>{starSymbol.repeat(numberofStars)}</span>;
  }
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
        <Profileinfo />
      </Modal>
    </div>
  );
}
