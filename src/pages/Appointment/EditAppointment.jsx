import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Calendar } from "primereact/calendar";
import { useRoomsData } from "../../hooks/Queries/useRoomsData";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { parseISO, formatISO } from "date-fns";
import { Dropdown } from "primereact/dropdown";
import { useEditAppointmentData } from "../../hooks/Queries/useAppointmentsData";

const EditAppointment = ({ appointment, setVisible }) => {
  const { mutate: editAppointment } = useEditAppointmentData();
  const {
    data: rooms,
    isLoading: roomsIsLoading,
    isError: roomsIsError,
  } = useRoomsData();

  const validationSchema = Yup.object({
    date: Yup.string().required("Date is Required"),
    duration: Yup.string().required("Duration is Required"),
    reason: Yup.string().required("Reason is Required"),
    roomID: Yup.string().required("Room is Required"),
  });

  const formik = useFormik({
    initialValues: {
      date: parseISO(appointment.date),
      reason: appointment.reason,
      duration: appointment.duration,
      roomID: appointment.roomID,
    },
    onSubmit: (values) => {
      let data = {
        id: appointment.id,
        date: formatISO(values.date),
        reason: values.reason,
        duration: values.duration,
        createdbyID: appointment.createdbyID,
        doctorID: appointment.doctorID,
        roomID: values.roomID,
        patientID: appointment.patientID,
      };
      editAppointment(data);
      setVisible(false);
    },
    validationSchema,
    enableReinitialize: true,
  });

  if (roomsIsError) {
    return <div>Error</div>;
  } else if (roomsIsLoading) {
    return <div> Loading </div>;
  }

  const roomOptions = rooms.map((room) => {
    return {
      label: room.title,
      value: room.id,
    };
  });
  return (
    <form id="editAppointment" onSubmit={formik.handleSubmit}>
      <div className="flex w-full mt-3">
      <div className="w-6 mr-5">
      <label htmlFor="date" className="mb-1 inline-block">
        Date:
      </label>
      <Calendar
        autoFocus={true}
        id="date"
        className="inputfield w-full"
        name="date"
        autoComplete="nope"
        showTime
        {...formik.getFieldProps("date")}
      />
      <div className="p-error h-2rem">
        {formik.touched.date && formik.errors.date ? (
          <span>{formik.errors.date}</span>
        ) : null}
      </div>
      </div>
      {/*  */}
      <div className="w-6">
      <label htmlFor="duration" className="mb-1 inline-block">
        Duration:
      </label>
      <InputNumber
        id="duration"
        className="inputfield w-full"
        name="duration"
        autoComplete="nope"
        {...formik.getFieldProps("duration")}
      />
      <div className="p-error h-2rem">
        {formik.touched.duration && formik.errors.duration ? (
          <span>{formik.errors.duration}</span>
        ) : null}
      </div>
      </div>
      </div>
      {/*  */}
      <div className="flex w-full">
      <div className="w-6 mr-5">
      <label htmlFor="reason" className="mb-1 inline-block">
        Reason:
      </label>
      <InputText
        id="reason"
        className="inputfield w-full"
        name="reason"
        autoComplete="nope"
        {...formik.getFieldProps("reason")}
      />
      <div className="p-error h-2rem">
        {formik.touched.reason && formik.errors.reason ? (
          <span>{formik.errors.reason}</span>
        ) : null}
      </div>
      </div>
      {/*  */}
      <div className="w-6">
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
      </div>
      </div>
    </form>
  );
};

export default EditAppointment;
