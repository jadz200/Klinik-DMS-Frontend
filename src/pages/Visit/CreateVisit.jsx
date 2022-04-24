import React from "react";
import { useParams } from "react-router-dom";
import { useAddVisitData } from "../../hooks/Queries/useVisitsData";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { useDoctorsData } from "../../hooks/Queries/useDoctorsData";
import { useRoomsData } from "../../hooks/Queries/useRoomsData";
import { useNavigate } from "react-router-dom";

const CreateVisit = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const {
    data: doctors,
    isLoading: doctorIsLoading,
    isError: doctorIsError,
  } = useDoctorsData();

  const {
    data: rooms,
    isLoading: roomIsLoading,
    isError: roomIsError,
  } = useRoomsData();

  const { mutate: addVisit } = useAddVisitData();

  const validationSchema = Yup.object({
    cost: Yup.string().required("Cost is Required"),
    comments: Yup.string(),
    doctorID: Yup.string().required("Doctor is Required"),
    roomID: Yup.string().required("Room is Required"),
  });

  const formik = useFormik({
    initialValues: {
      cost: "0",
      comments: "",
      doctorID: "",
      roomID: "",
    },
    onSubmit: (values) => {
      console.log(values);
      let visit = {
        comments: values.comments,
        cost: parseInt(values.cost),
        patientID: parseInt(id),
        doctorID: values.doctorID,
        roomID: values.roomID,
      };
      console.log(visit);
      addVisit(visit);
      navigate("/patient");
    },
    validationSchema,
  });

  if (doctorIsError || roomIsError) {
    return <div>An Error has occurred</div>;
  }

  if (doctorIsLoading || roomIsLoading) {
    return <div>is Loading</div>;
  }

  const doctorsOptions = doctors
    .filter((doctor) => doctor.roleID === 1)
    .map((doctor) => {
      return {
        label: doctor.first_name,
        value: doctor.id,
      };
    });

  const roomOptions = rooms.map((room) => {
    return {
      label: room.title,
      value: room.id,
    };
  });

  return (
    <form id="createPatient" onSubmit={formik.handleSubmit}>
      {/*  */}
      <label htmlFor="comments" className="mb-1 inline-block">
        Comments:
      </label>
      <InputTextarea
        cols={30}
        rows={5}
        id="comments"
        className="inputfield w-full"
        name="comments"
        autoComplete="nope"
        {...formik.getFieldProps("comments")}
      />
      <div className="p-error h-2rem">
        {formik.touched.comments && formik.errors.comments ? (
          <span>{formik.errors.comments}</span>
        ) : null}
      </div>
      {/*  */}
      <label htmlFor="doctorID" className="mb-1 inline-block">
        Doctor:
      </label>
      <Dropdown
        id="doctorID"
        className="inputfield w-full"
        name="doctorID"
        autoComplete="nope"
        options={doctorsOptions}
        {...formik.getFieldProps("doctorID")}
      />
      <div className="p-error h-2rem">
        {formik.touched.doctorID && formik.errors.doctorID ? (
          <span>{formik.errors.doctorID}</span>
        ) : null}
      </div>
      {/*  */}
      <label htmlFor="roomID" className="mb-1 inline-block">
        Room:
      </label>
      <Dropdown
        id="roomID"
        className="inputfield w-full"
        name="roomID"
        autoComplete="nope"
        options={roomOptions}
        {...formik.getFieldProps("roomID")}
      />
      <div className="p-error h-2rem">
        {formik.touched.roomID && formik.errors.roomID ? (
          <span>{formik.errors.roomID}</span>
        ) : null}
      </div>

      {/*  */}

      <label htmlFor="cost" className="mb-1 inline-block">
        Cost:
      </label>
      <InputText
        id="cost"
        className="inputfield w-full"
        name="cost"
        autoComplete="nope"
        {...formik.getFieldProps("cost")}
      />
      <div className="p-error h-2rem">
        {formik.touched.cost && formik.errors.cost ? (
          <span>{formik.errors.cost}</span>
        ) : null}
      </div>
    </form>
  );
};

export default CreateVisit;
