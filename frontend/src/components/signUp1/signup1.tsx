import "../login/login.scss";
import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
export default function Signup1() {
  const form = useRef(null);
  const formData = useFormik({
    initialValues: {
      firstname: "",
      email: "",
      lastname: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res = axios.post("http://localhost:8000/api/user/register", values);
      console.log(res);
    },
    validationSchema: Yup.object().shape({
      firstname: Yup.string()
        .required("مطلوب أدخال أسم")
        .min(3, "قصير")
        .max(50, "Too Long!"),
      lastname: Yup.string()
        .required("مطلوب أدخال اللقب")
        .min(3, "قصير")
        .max(50, "Too Long!"),
      email: Yup.string()
        .email("بريد ألكتروني غير صالح")
        .required("مطلوب أدخال بريد ألكتروني"),
      password: Yup.string()
        .required("مطلوب أدخال كلمةالمرور ")
        .min(8, "كلمة السر قصيرة"),
    }),
  });

  return (
    <div className="container ttr">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">مرحبًا بك</h2>
          <h4 className="animation a2">قم بتسجيل حساب لتمتع بالخدامات متاحة</h4>
        </div>
        <form className="form" ref={form} onSubmit={formData.handleSubmit}>
          <input
            type="text"
            placeholder="الأسم"
            className="form-field animation a3"
            {...formData.getFieldProps("firstname")}
          />
          {formData.errors.firstname && formData.touched.firstname ? (
            <span>{formData.errors.firstname}</span>
          ) : null}
          <input
            type="text"
            placeholder="اللقب"
            className="form-field animation a3"
            {...formData.getFieldProps("lastname")}
          />
          {formData.errors.lastname && formData.touched.lastname ? (
            <span>{formData.errors.lastname}</span>
          ) : null}
          <input
            type="email"
            {...formData.getFieldProps("email")}
            className="form-field animation a3"
            placeholder="البريد ألكتروني"
          />
          {formData.errors.email && formData.touched.email ? (
            <span>{formData.errors.email}</span>
          ) : null}
          <input
            type="password"
            {...formData.getFieldProps("password")}
            className="form-field animation a4"
            placeholder="كلمة المرور"
          />
          {formData.errors.password && formData.touched.password ? (
            <span>{formData.errors.password}</span>
          ) : null}

          <button className="animation a6" type="submit">
            تسجيل
          </button>
        </form>
      </div>
      <div className="right" />
    </div>
  );
}
