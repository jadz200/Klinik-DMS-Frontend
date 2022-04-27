import React from "react";
import { useRoomData } from "../../hooks/Queries/useRoomData";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useEditRoomData } from "../../hooks/Queries/useRoomsData";
import * as Yup from "yup";

const EditRoom = () => {
  const { id } = useParams();
  const { isLoading, data, error, isError } = useRoomData(id);
  console.log(data);

  if (isLoading) {
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
  const { mutate: editRoom } = useEditRoomData();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    title: Yup.string().required("Room Name is Required"),
  });
  const formik = useFormik({
    initialValues: {
      title: data.title,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const room = { ...values, id, clinicID: 1 };
      editRoom(room);

      navigate("/room");
    },
    validationSchema,
  });
  return (
    <Card>
      <form id="editRoom" onSubmit={formik.handleSubmit}>
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

export default EditRoom;
