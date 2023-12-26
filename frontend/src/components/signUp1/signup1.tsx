import "../login/login.scss";
import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Signup1() {
  const form = useRef(null);
  const formData = useFormik({
    initialValues: {
      name: "",
      email: "",
      lastname: "",
      address: "",
      phonenumber: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
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
      phonenumber: Yup.string()
        .required("رجاء أدخال رقم الهاتف")
        .min(8, "الرقم غير صالح أو غير كامل"),
      address: Yup.string().required("مطلوب أدخال العنوان"),
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
            {...formData.getFieldProps("name")}
          />
          {formData.errors.name && formData.touched.name ? (
            <span>{formData.errors.name}</span>
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

          <button className="animation a6" disabled={!formData.isValid}>
            تسجيل
          </button>
        </form>
      </div>
      <div className="right" />
    </div>
  );
}
