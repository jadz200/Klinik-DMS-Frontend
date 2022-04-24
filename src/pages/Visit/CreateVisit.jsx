import React, { useState } from "react";
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
import { useStore } from "../../hooks/Store/useStore";
import { usePatientData } from "../../hooks/Queries/usePatientData";
import { useOperationsData } from "../../hooks/Queries/useOperationsData";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const CreateVisit = () => {
  const setCurrentItem = useStore((state) => state.setCurrentItem);
  const [visible, setVisible] = useState(false);
  const [price, setPrice] = useState(0);
  const [visitOperation, setVisitOperation] = useState("");
  const [visitOperations, setVisitOperations] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: patient,
    isLoading: patientIsLoading,
    isError: patientIsError,
  } = usePatientData(id);

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

  const {
    data: operations,
    isLoading: operationIsLoading,
    isError: operationIsError,
  } = useOperationsData();

  const { mutate: addVisit } = useAddVisitData(visitOperations);

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
      let visit = {
        comments: values.comments,
        cost: parseInt(values.cost),
        patientID: parseInt(id),
        doctorID: values.doctorID,
        roomID: values.roomID,
      };
      addVisit(visit);
      navigate("/patient");
    },
    validationSchema,
  });

  if (doctorIsError || roomIsError || patientIsError || operationIsError) {
    return <div>An Error has occurred</div>;
  }

  if (
    doctorIsLoading ||
    roomIsLoading ||
    patientIsLoading ||
    operationIsLoading
  ) {
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

  const operationOptions = operations.map((operation) => {
    return {
      label: operation.title,
      value: operation.id,
    };
  });

  setCurrentItem(
    "Create Visit " + patient.first_name + "  " + patient.last_name
  );

  const operationsTemplate = (rowData) => {
    return (
      <>{operations.find((operation) => operation.id === rowData.id).title}</>
    );
  };

  return (
    <form id="createPatient" onSubmit={formik.handleSubmit}>
      <div className="mb-5">
        <Button
          label="Add Operation"
          className="mb-5"
          onClick={() => {
            setVisible(true);
          }}
        />

        <DataTable value={visitOperations}>
          <Column
            header="Name"
            body={operationsTemplate}
            style={{ width: "30%" }}
          ></Column>
          <Column field="cost" header="Cost" style={{ width: "70%" }}></Column>
        </DataTable>
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
      <Dialog
        header={`Add Operation`}
        style={{ width: "50vw" }}
        visible={visible}
        onHide={() => {
          setVisible(false);
        }}
      >
        <label htmlFor="operation" className="mb-1 inline-block">
          Operation:
        </label>
        <Dropdown
          id="operation"
          className="inputfield w-full mb-5"
          name="operation"
          autoComplete="nope"
          required={true}
          options={operationOptions}
          value={visitOperation}
          onChange={(e) => {
            setVisitOperation(e.target.value);
          }}
        />
        <InputText
          id="price"
          className="inputfield w-full mb-5"
          name="price"
          autoComplete="nope"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <Button
          label="Add Operation"
          disabled={visitOperation === ""}
          onClick={() => {
            setVisitOperations([
              ...visitOperations,
              { id: visitOperation, cost: price },
            ]);
            setVisitOperation("");
            setPrice(0);
            setVisible(false);
          }}
        />
      </Dialog>
    </form>
  );
};

export default CreateVisit;
