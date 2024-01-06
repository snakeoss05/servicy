import React, { useState } from "react";
import "./createservice.scss";
import jsonData from "../../../data/tn.json";
import { useSelector } from "react-redux";
import categorysList from "../../../data/categorys";
import axios from "axios";

export default function CreateService() {
  const user = useSelector((state: any) => state.auth.user);
  const [action, setaction] = useState(1);
  const [service, setService] = useState({
    userid: user.userid,
    name: "",
    category: "",
    city: "",
    address: "",
    phonenumber: "",
    image1: "",
  });
  const [alert, setalert] = useState({
    message: "",
    fail: false,
    display: false,
  });
  const [image, setImage] = useState(null);
  const uniquecities = [...new Set(jsonData.map((obj: any) => obj.admin_name))];
  const listofGov = jsonData.filter((obj) => obj.admin_name === service.city);
  const categorys = categorysList.keys;
  const formData = (selectedCategory) => {
    if (selectedCategory && categorysList[selectedCategory]) {
      return categorysList[selectedCategory].map((value, index) => (
        <li
          key={index}
          onClick={() =>
            setService((prevState) => ({
              ...prevState,
              name: value,
            }))
          }>
          {value}
        </li>
      ));
    } else {
      return null;
    }
  };

  function HandleChange(event: any) {
    const { name, value } = event.target;
    setService((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setService({ ...service, image1: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const CreateService = async () => {
    try {
      const formData = new FormData();
      formData.append("name", service.name);
      formData.append("userid", service.userid);
      formData.append("address", service.address);
      formData.append("category", service.category);
      formData.append("image1", service.image1);
      formData.append("city", service.city);
      formData.append("phonenumber", service.phonenumber);

      const response = await axios.post(
        "http://localhost:8000/api/service/create",
        formData
      );
      setalert((state) => ({
        ...state,
        message: response.data.message,
        display: true,
      }));
      const alertOff = setTimeout(() => {
        setalert((state) => ({
          ...state,

          display: false,
        }));
      }, 2000);

      return () => {
        clearTimeout(alertOff);
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      /*  setalert((state) => ({
        ...state,
        message: error.message,
        fail: true,
        display: true,
      }));*/
      console.log(error);
    }
  };
  const renderForm = () => {
    switch (action) {
      case 1:
        return (
          <div className="step1">
            <h4>أنشاء خدمات</h4>
            <div className="gridcontainer">
              <div className="groupField">
                <label htmlFor="firstname">أسم الخدمة</label>
                <div className="customSelect">
                  <p>{service.name ? service.name : "nom de service"} </p>
                  <ul>{formData(service.category)}</ul>
                </div>
              </div>
              <div className="groupField">
                <label htmlFor="firstname">تصنيف الخدمة</label>
                <div className="customSelect">
                  <p>{service.category ? service.category : "Categorys"} </p>
                  <ul>
                    {categorys.map((cat, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() =>
                            setService((state) => ({
                              ...state,
                              category: cat,
                            }))
                          }>
                          {cat}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="groupField">
                <label htmlFor="firstname">المعتمدية</label>
                <div className="customSelect">
                  <p>{service.address ? service.address : "délégation"} </p>
                  <ul>
                    {listofGov.map((gov, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() =>
                            setService((state) => ({
                              ...state,
                              address: gov.city,
                            }))
                          }>
                          {gov.city}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="groupField">
                <label htmlFor="ville">الولاية</label>
                <div className="customSelect">
                  <p>{service.city ? service.city : "tunis"}</p>
                  <ul>
                    {uniquecities.map((city, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setService((state) => ({ ...state, city: city }));
                          }}>
                          {city}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="groupField full-width">
                <label htmlFor="phonenumber">رقم الهاتف</label>
                <input
                  type="text"
                  name="phonenumber"
                  onChange={HandleChange}
                  placeholder="رقم الهاتف"
                />
              </div>
            </div>
            <div className="nextprevbtn">
              <button onClick={() => setaction(2)} className="prev">
                التالي
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step2">
            <div className="title">حمل صور لبعض مشاريع سابقة</div>
            <div className="imgplace">
              {image ? (
                <img src={image} alt="serviceImg" />
              ) : (
                <i className="fa-solid fa-image"></i>
              )}
            </div>

            <label className="custom-file-upload">
              <input type="file" name="image1" onChange={handleFileChange} />
              تحميل
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <p>يجب ألا يتجاوز حجم الملف 2 مياجا</p>
            </label>
            {alert.display && (
              <span style={{ color: alert.fail ? "green" : "orangered" }}>
                {alert.message}
              </span>
            )}
            <div className="nextprevbtn">
              <button onClick={CreateService} className="prev">
                تأكيد
              </button>
              <button onClick={() => setaction(1)} className="prev">
                السابق
              </button>
            </div>
          </div>
        );

      default:
        null;
    }
  };

  return <div id="createService">{renderForm()}</div>;
}
