import React from "react";
import { usePatientsData } from "@hooks/Queries/usePatientsData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useStore } from "../../hooks/Store/useStore";

const ListPatient = () => {
  let selectedItems = useStore((state) => state.selectedItems);
  let setSelectedItems = useStore((state) => state.setSelectedItems);
  let filter = useStore((state) => state.filter);
  const { isLoading, data: patients, isError, error } = usePatientsData();

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
              .startsWith(filter.toLocaleLowerCase()) ||
            patient.id
              .toString()
              .toLocaleLowerCase()
              .startsWith(filter.toLocaleLowerCase()) ||
            patient.last_name
              .toLocaleLowerCase()
              .startsWith(filter.toLocaleLowerCase()) ||
            patient.address
              .toLocaleLowerCase()
              .startsWith(filter.toLocaleLowerCase()) ||
            patient.mail
              .toLocaleLowerCase()
              .startsWith(filter.toLocaleLowerCase()) ||
            patient.phone
              .toString()
              .toLocaleLowerCase()
              .startsWith(filter.toLocaleLowerCase())
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
        <Column selectionMode="multiple" style={{ width: "10%" }}></Column>
        <Column field="id" header="ID" style={{ width: "10%" }}></Column>
        <Column
          field="first_name"
          header="First Name"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="last_name"
          header="Last Name"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="phone"
          header="Phone Number"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="mail"
          header="Email"
          style={{
            width: "10%",
            overflow: "hidden",
          }}
        ></Column>
        <Column
          field="address"
          header="Address"
          style={{ width: "10%" }}
        ></Column>
      </DataTable>
    </>
  );
};

export default ListPatient;
