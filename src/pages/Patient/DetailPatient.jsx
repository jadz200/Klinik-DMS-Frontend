import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePatientData } from "../../hooks/Queries/usePatientData";
import {
  useDeleteVisitData,
  usePatientVisitsData,
} from "../../hooks/Queries/useVisitsData";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { format, parseJSON } from "date-fns";
import { Button } from "primereact/button";

const DetailPatient = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, data: patient, isError } = usePatientData(id);
  const {
    data: patientVisits,
    isLoading: patientVisitsIsLoading,
    isError: patientVisitsIsError,
  } = usePatientVisitsData(id);

  const { mutate: deleteVisit } = useDeleteVisitData();

  if (isLoading | patientVisitsIsLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError | patientVisitsIsError) {
    return <h2>Error</h2>;
  }

  const actionButtonsTemplate = (rowData) => {
    return (
      <div className="flex">
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-sm p-button-warning mr-2"
          onClick={() => {
            navigate(`visit/${rowData.id}/edit`);
          }}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-sm p-button-danger"
          onClick={() => {
            deleteVisit(rowData.id);
          }}
        />
      </div>
    );
  };

  const visits = patientVisits.map((visit) => {
    console.log(visit.date);
    const date = format(parseJSON(visit.date), "yyyy-MM-dd' at 'HH:mm");
    return { ...visit, date };
  });

  return (
    <TabView
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
    >
      <TabPanel header="Details">
        <div className="flex align-items-center align-content-center mb-4">
          <h3 className="underline">First Name:</h3>
          <p className="text-xl ml-4">{patient.first_name}</p>
        </div>
        <div className="flex align-items-center align-content-center mb-4">
          <h3 className="underline">Last Name:</h3>
          <p className="text-xl ml-4">{patient.last_name}</p>
        </div>
        <div className="flex align-items-center align-content-center mb-4">
          <h3 className="underline">Phone Number:</h3>
          <p className="text-xl ml-4">{patient.phone}</p>
        </div>
        <div className="flex align-items-center align-content-center mb-4">
          <h3 className="underline">Email:</h3>
          <p className="text-xl ml-4">{patient.mail}</p>
        </div>
        <div className="flex align-items-center align-content-center mb-4">
          <h3 className="underline">Address Name:</h3>
          <p className="text-xl ml-4">{patient.address}</p>
        </div>
      </TabPanel>
      <TabPanel header="Visits">
        <DataTable value={visits} dataKey="id">
          <Column
            sortable
            field="id"
            header="ID"
            style={{ width: "5%" }}
          ></Column>
          <Column
            sortable
            field="comments"
            header="Comments"
            style={{ width: "25%" }}
          ></Column>
          <Column
            sortable
            field="cost_currency"
            header="Currency"
            style={{ width: "10%" }}
          ></Column>
          <Column
            sortable
            field="cost"
            header="Cost"
            style={{ width: "10%" }}
          ></Column>
          <Column
            sortable
            field="date"
            header="Date"
            style={{ width: "20%" }}
          ></Column>
          <Column
            header="Actions"
            body={actionButtonsTemplate}
            style={{ width: "30%" }}
            onClick={(e) => {
              console.log(e);
            }}
          ></Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="Payment Journals">Content III</TabPanel>
    </TabView>
  );
};

export default DetailPatient;
