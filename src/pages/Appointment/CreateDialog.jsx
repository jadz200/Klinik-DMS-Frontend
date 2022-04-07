import React from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useDoctorsData } from "../../hooks/Queries/useDoctorsData";
import { useSecretariesData } from "../../hooks/Queries/useSecretariesData";
import { usePatientsData } from "../../hooks/Queries/usePatientsData";
import { useRoomsData } from "../../hooks/Queries/useRoomsData";
import { Dropdown } from "primereact/dropdown";

import { Button } from "primereact/button";
import { useAddAppointmentData } from "../../hooks/Queries/useAppointmentsData";
import { formatISO } from "date-fns";

const CreateDialog = ({ visible, setVisible }) => {
  const { mutate: addAppointment } = useAddAppointmentData();
  const {
    data: secretaries,
    isLoading: secretaryIsLoading,
    isError: secretaryIsError,
  } = useSecretariesData();

  const {
    data: doctors,
    isLoading: doctorIsLoading,
    isError: doctorIsError,
  } = useDoctorsData();

  const {
    data: patients,
    isLoading: patientIsLoading,
    isError: patientIsError,
  } = usePatientsData();

  const {
    data: rooms,
    isLoading: roomIsLoading,
    isError: roomIsError,
  } = useRoomsData();

  const validationSchema = Yup.object({
    date: Yup.string().required("Date is Required"),
    duration: Yup.string().required("Duration is Required"),
    reason: Yup.string().required("Reason is Required"),
    createdbyID: Yup.number().required("Created By is Required"),
    roomID: Yup.string().required("Room is Required"),
    doctorID: Yup.string().required("Doctor is Required"),
    patientID: Yup.string().required("Patient is Required"),
  });

  const formik = useFormik({
    initialValues: {
      date: "",
      reason: "",
      duration: 30,
      createdbyID: "",
      roomID: "",
      doctorID: "",
      patientID: "",
    },
    onSubmit: (values, { resetForm }) => {
      let appointment = {
        date: formatISO(values.date),
        reason: values.reason,
        duration: values.duration,
        createdbyID: values.createdbyID,
        doctorID: values.doctorID,
        roomID: values.roomID,
        patientID: values.patientID,
      };
      addAppointment(appointment);
      resetForm();
      setVisible(false);
    },
    validationSchema,
  });
  if (patientIsError || doctorIsError || secretaryIsError || roomIsError) {
    return <div>Error</div>;
  }
  if (
    patientIsLoading ||
    doctorIsLoading ||
    secretaryIsLoading ||
    roomIsLoading
  ) {
    return <div>Is Loading</div>;
  }
  const patientsOptions = patients.map((patient) => {
    return {
      label: patient.first_name,
      value: patient.id,
    };
  });

  const doctorsOptions = doctors
    .filter((doctor) => doctor.roleID === 1)
    .map((doctor) => {
      return {
        label: doctor.first_name,
        value: doctor.id,
      };
    });

  const secretariesOptions = secretaries
    .filter((secretary) => secretary.roleID === 2)
    .map((secretary) => {
      return {
        label: secretary.first_name,
        value: secretary.id,
      };
    });

  const roomOptions = rooms.map((room) => {
    return {
      label: room.title,
      value: room.id,
    };
  });

  return (
    <Dialog
      header="Create Appointment"
      visible={visible}
      onHide={() => {
        setVisible(false);
      }}
      style={{ width: "50vw" }}
    >
      <form id="createAppointment" onSubmit={formik.handleSubmit}>
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
        {/*  */}
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
        {/*  */}
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
        <label htmlFor="patientID" className="mb-1 inline-block">
          Patient:
        </label>
        <Dropdown
          id="patientID"
          className="inputfield w-full"
          name="patientID"
          autoComplete="nope"
          options={patientsOptions}
          {...formik.getFieldProps("patientID")}
        />
        <div className="p-error h-2rem">
          {formik.touched.patientID && formik.errors.patientID ? (
            <span>{formik.errors.patientID}</span>
          ) : null}
        </div>
        {/*  */}
        <label htmlFor="createdbyID" className="mb-1 inline-block">
          Created By:
        </label>
        <Dropdown
          id="createdbyID"
          className="inputfield w-full"
          name="createdbyID"
          autoComplete="nope"
          options={secretariesOptions}
          {...formik.getFieldProps("createdbyID")}
        />
        <div className="p-error h-2rem">
          {formik.touched.createdbyID && formik.errors.createdbyID ? (
            <span>{formik.errors.createdbyID}</span>
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
        <Button type="submit" label="Create Appointment" />
      </form>
    </Dialog>
  );
};

export default CreateDialog;