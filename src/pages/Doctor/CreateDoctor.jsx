import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { useAddDoctorData } from "../../hooks/Queries/useDoctorsData";

const CreateDoctor = () => {
  const navigate = useNavigate();
  const { mutate: addDoctor } = useAddDoctorData();
  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is Required"),
    last_name: Yup.string().required("Last Name is Required"),
    mail: Yup.string()
      .email("Invalid Email Format")
      .required("Email is Required"),
    phone: Yup.string().required("Phone Number is Required"),
  });
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      mail: "",
      phone: "",
    },
    onSubmit: (values) => {
      let doctor = { ...values, clinicID: 1, roleID: 1 };
      addDoctor(doctor);

      navigate("/doctor");
    },
    validationSchema,
  });
  return (
    <Card>
      <form id="createDoctor" onSubmit={formik.handleSubmit}>
        <label htmlFor="first_name" className="mb-1 inline-block">
          First Name:
        </label>
        <InputText
          autoFocus={true}
          id="first_name"
          type="text"
          className="inputfield w-full"
          name="first_name"
          autoComplete="nope"
          {...formik.getFieldProps("first_name")}
        />
        <div className="p-error h-1rem">
          {formik.touched.first_name && formik.errors.first_name ? (
            <span>{formik.errors.first_name}</span>
          ) : null}
        </div>
        {/*  */}
        <label htmlFor="last_name" className="mb-1 inline-block">
          Last Name:
        </label>
        <InputText
          id="last_name"
          type="text"
          className="inputfield w-full"
          name="last_name"
          autoComplete="nope"
          {...formik.getFieldProps("last_name")}
        />
        <div className="p-error h-1rem">
          {formik.touched.last_name && formik.errors.last_name ? (
            <span>{formik.errors.last_name}</span>
          ) : null}
        </div>
        {/*  */}
        <label htmlFor="phone" className="mb-1 inline-block">
          Phone:
        </label>
        <InputText
          id="phone"
          type="text"
          className="inputfield w-full"
          name="phone"
          autoComplete="nope"
          {...formik.getFieldProps("phone")}
        />
        <div className="p-error h-1rem">
          {formik.touched.phone && formik.errors.phone ? (
            <span>{formik.errors.phone}</span>
          ) : null}
        </div>
        {/*  */}
        <label htmlFor="mail" className="mb-1 inline-block">
          Email:
        </label>
        <InputText
          id="mail"
          type="text"
          className="inputfield w-full"
          name="mail"
          autoComplete="nope"
          {...formik.getFieldProps("mail")}
        />
        <div className="p-error h-1rem">
          {formik.touched.mail && formik.errors.mail ? (
            <span>{formik.errors.mail}</span>
          ) : null}
        </div>
      </form>
    </Card>
  );
};

export default CreateDoctor;
