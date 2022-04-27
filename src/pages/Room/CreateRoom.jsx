import React from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAddRoomData } from "../../hooks/Queries/useRoomsData";

const CreateRoom = () => {
  const navigate = useNavigate();
  const { mutate: addRoom } = useAddRoomData();
  const validationSchema = Yup.object({
    title: Yup.string().required("Room Title is Required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      let room = { ...values, clinicID: 1 };
      console.log(room);
      addRoom(room);

      navigate("/room");
    },
    validationSchema,
  });
  return (
    <Card>
      <form id="createRoom" onSubmit={formik.handleSubmit}>
        <label htmlFor="title" className="mb-1 inline-block">
          Title:
        </label>
        <InputText
          autoFocus={true}
          id="title"
          type="text"
          className="inputfield w-full"
          name="title"
          autoComplete="nope"
          {...formik.getFieldProps("title")}
        />
        <div className="p-error h-1rem">
          {formik.touched.title && formik.errors.title ? (
            <span>{formik.errors.title}</span>
          ) : null}
        </div>
      </form>
    </Card>
  );
};

export default CreateRoom;
