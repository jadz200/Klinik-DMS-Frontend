import React from "react";
import { usePatientsData } from "@hooks/Queries/usePatientsData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useStore } from "../../hooks/Store/useStore";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const ListPatient = () => {
  let selectedItems = useStore((state) => state.selectedItems);
  let setSelectedItems = useStore((state) => state.setSelectedItems);
  let filter = useStore((state) => state.filter);
  const { isLoading, data: patients, isError, error } = usePatientsData();
  const navigate = useNavigate();

  const actionButtonsTemplate = (rowData) => {
    return (
      <Button
        label="New Visit"
        className="p-button-info p-button-sm"
        onClick={() => {
          console.log(rowData);
          navigate(`${rowData.id}/visit/create`);
        }}
      />
    );
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <DataTable
        selectionMode="multiple"
        selection={selectedItems}
        onSelectionChange={(e) => {
          setSelectedItems(e.value);
        }}
        value={patients.filter(
          (patient) =>
            patient.first_name
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            patient.id
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            patient.last_name
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            patient.address
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            patient.mail
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            patient.phone
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
        )}
        dataKey="id"
        responsiveLayout="scroll"
        scrollHeight="flex"
        scrollable
        selectionPageOnly
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
        autoLayout={true}
      >
        <Column selectionMode="multiple" style={{ width: "5%" }}></Column>
        <Column
          field="id"
          header="ID"
          style={{ width: "5%" }}
          sortable
        ></Column>
        <Column
          field="first_name"
          header="First Name"
          style={{ width: "15%" }}
          sortable
        ></Column>
        <Column
          field="last_name"
          header="Last Name"
          style={{ width: "15%" }}
          sortable
        ></Column>
        <Column
          field="phone"
          header="Phone Number"
          style={{ width: "15%" }}
          sortable
        ></Column>
        <Column
          field="mail"
          header="Email"
          style={{
            width: "15%",
          }}
          sortable
        ></Column>
        <Column
          field="address"
          header="Address"
          style={{ width: "15%" }}
          sortable
        ></Column>
        <Column
          header="Actions"
          body={actionButtonsTemplate}
          style={{ width: "15%" }}
          onClick={(e) => {
            console.log(e);
          }}
        ></Column>
      </DataTable>
    </>
  );
};

export default ListPatient;
