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
import { useStore } from "../../hooks/Store/useStore";

const DetailPatient = () => {
  const setCurrentItem = useStore((state) => state.setCurrentItem);
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

  setCurrentItem("Detail " + patient.first_name + "  " + patient.last_name);

  return (
    <>
      <div className="card ">
        <div className="card-container m-4 overflow-hidden border-round m-2">
          <div className="flex ">
            <div className="flex-none flex align-items-center justify-content-center bg-white text-black m-2 px-5 py-3 ">
              <div className="flex align-items-center align-content-center mb-4">
                <p className="text-xl ml-4 underline">{patient.mail}</p>
              </div>
            </div>
            <div className="flex-1 flex bg-white text-black m-2 px-5 py-3 ">
              <div className="grid">
                <div className=" grid col-12 ">
                  <h3 className="underline font-bold ">First Name:</h3>
                  <p className="text-xl ml-4">{patient.first_name}</p>
                </div>
                <div className="grid col-12 ">
                  <h3 className="underline font-bold  ">Last Name:</h3>
                  <p className="text-xl ml-4 ">{patient.last_name}</p>
                </div>
              </div>
              <div className="grid">
                <div className=" grid col-12 mb-4">
                  <h3 className="underline font-bold ">Phone Number:</h3>
                  <p className="text-xl ml-4">{patient.phone}</p>
                </div>
                <div className=" grid col-12 mb-4">
                  <h3 className="underline font-bold ">Address Name:</h3>
                  <p className="text-xl ml-4">{patient.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <TabPanel header="Visits">
          <DataTable value={visits} dataKey="id">
            <Column
              sortable
              field="comments"
              header="Comments"
              style={{ width: "40%" }}
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
              style={{ width: "20%" }}
              onClick={(e) => {
                console.log(e);
              }}
            ></Column>
          </DataTable>
        </TabPanel>
      </TabView>
    </>
  );
};

export default DetailPatient;
