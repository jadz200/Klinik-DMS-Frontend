import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useDoctorData } from "../../hooks/Queries/useDoctorData";
import { useEditDoctorData } from "../../hooks/Queries/useDoctorsData";

const EditDoctor = () => {
  const { id } = useParams();
  const { isLoading, data, error, isError, isPreviousData } = useDoctorData(id);
  console.log(data);

  if (isLoading || isPreviousData) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <Form data={data} id={id} />
    </>
  );
};

const Form = ({ data, id }) => {
  console.log(data);
  const { mutate: editDoctor } = useEditDoctorData();
  const navigate = useNavigate();
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
      first_name: data.first_name,
      last_name: data.last_name,
      mail: data.mail,
      phone: data.phone,
      address: data.address,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const doctor = { ...values, id, clinicID: 1, roleID: 1 };
      editDoctor(doctor);

      navigate("/doctor");
    },
    validationSchema,
  });
  return (
    <Card>
      <form id="editDoctor" onSubmit={formik.handleSubmit}>
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

export default EditDoctor;
