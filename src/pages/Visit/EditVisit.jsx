import React from "react";
import { useParams } from "react-router-dom";
import { useEditVisitData } from "../../hooks/Queries/useVisitsData";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { useDoctorsData } from "../../hooks/Queries/useDoctorsData";
import { useRoomsData } from "../../hooks/Queries/useRoomsData";
import { formatISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useVisitData } from "../../hooks/Queries/useVisitData";
import { parseJSON } from "date-fns/esm";
import { usePatientData } from "../../hooks/Queries/usePatientData";
import { useStore } from "../../hooks/Store/useStore";

const EditVisit = () => {
  const { id, visitID } = useParams();
  console.log(id, visitID);
  const setCurrentItem = useStore((state) => state.setCurrentItem);

  const {
    data: visit,
    isLoading: visitIsLoading,
    isError: visitIsError,
  } = useVisitData(visitID);

  const {
    data: patient,
    isLoading: patientIsLoading,
    isError: patientIsError,
  } = usePatientData(id);

  console.log(visit);

  if (visitIsError | patientIsError) {
    return <div>Error</div>;
  }

  if (visitIsLoading | patientIsLoading) {
    return <div>Loading</div>;
  }
  console.log(patient);
  setCurrentItem("Edit Visit " + patient.first_name + "  " + patient.last_name);

  return <Form visit={visit} />;
};

const Form = ({ visit }) => {
  const { mutate: editVisit } = useEditVisitData();
  const { id, visitID } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    date: Yup.string().required("Date is Required"),
    cost: Yup.string().required("Cost is Required"),
    comments: Yup.string(),
    doctorID: Yup.string().required("Doctor is Required"),
    roomID: Yup.string().required("Room is Required"),
  });

  console.log(visit.date);

  const formik = useFormik({
    initialValues: {
      date: parseJSON(visit.date),
      cost: visit.cost,
      comments: visit.comments,
      doctorID: visit.doctorID,
      roomID: visit.roomID,
    },
    onSubmit: (values) => {
      console.log(values);
      let visit = {
        id: visitID,
        date: formatISO(values.date),
        comments: values.comments,
        cost: parseInt(values.cost),
        patientID: parseInt(id),
        doctorID: values.doctorID,
        roomID: values.roomID,
      };
      editVisit(visit);
      navigate(-1);
    },
    validationSchema,
    enableReinitialize: true,
  });

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
    <>
      <form id="editPatient" onSubmit={formik.handleSubmit}>
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
    </>
  );
};

export default EditVisit;
