// File: SignUpForm.tsx

import React, { useState, useRef } from "react";
import "./signup.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUpForm: React.FC = () => {
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

  const [step, setStep] = useState<number>(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="firstform ">
            <div className="steps">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1>بدأ التسجيل</h1>
            <div className="groupeil">
              <label>أسم</label>
              <input type="text" {...formData.getFieldProps("name")} />
              {formData.errors.name && formData.touched.name ? (
                <p>{formData.errors.name}</p>
              ) : null}
            </div>
            <div className="groupeil">
              <label>اللقب</label>
              <input type="text" {...formData.getFieldProps("lastname")} />
              {formData.errors.lastname && formData.touched.lastname ? (
                <p>{formData.errors.lastname}</p>
              ) : null}
            </div>
            <div className="nextprev">
              <button
                type="button"
                className={`${
                  (!!formData.errors.lastname || !!formData.errors.name) &&
                  "disabled"
                }`}
                onClick={nextStep}
                disabled={!!formData.errors.lastname || !!formData.errors.name}>
                التالي
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="secondform">
            <div className="steps"></div>
            <div className="groupeil">
              <label>بريد ألكتروني</label>
              <input type="email" {...formData.getFieldProps("email")} />
              {formData.errors.email && formData.touched.email ? (
                <p>{formData.errors.email}</p>
              ) : null}
            </div>
            <div className="groupeil">
              <label>كلمة المرور</label>
              <input type="password" {...formData.getFieldProps("password")} />
              {formData.errors.password && formData.touched.password ? (
                <p>{formData.errors.password}</p>
              ) : null}
            </div>
            <div className="nextprev">
              <button
                type="button"
                onClick={nextStep}
                className={`${
                  (!!formData.errors.email || !!formData.errors.password) &&
                  "disabled"
                }`}
                disabled={
                  !!formData.errors.email || !!formData.errors.password
                }>
                التالي
              </button>
              <button type="button" onClick={prevStep} className="prev">
                السابق
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="thirdform">
            <div className="steps"></div>
            <div className="groupeil">
              <label>عنوان</label>
              <input type="text" {...formData.getFieldProps("address")} />
            </div>
            <div className="groupeil">
              <label>رقم الهاتف</label>
              <input type="text" {...formData.getFieldProps("phonenumber")} />
            </div>
            <div className="nextprev">
              <button
                type="submit"
                className={`${!formData.isValid && "disabled"}`}
                disabled={!formData.isValid}>
                تسجيل
              </button>
              <button type="button" onClick={prevStep} className="prev">
                السابق
              </button>
            </div>
            <div className="alert">
              <i className="fa-regular fa-circle-check"></i>{" "}
              <p> تم تسجيل بنجاح</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form id="multistep" ref={form} onSubmit={formData.handleSubmit}>
      {renderForm()}
    </form>
  );
};

export default SignUpForm;
