import React from "react";
import { useStore } from "../../hooks/Store/useStore";
import { useDoctorsData } from "../../hooks/Queries/useDoctorsData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ListDoctor = () => {
  let selectedItems = useStore((state) => state.selectedItems);
  let setSelectedItems = useStore((state) => state.setSelectedItems);
  let filter = useStore((state) => state.filter);
  const { isLoading, data: doctors, isError, error } = useDoctorsData();

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
        value={doctors.filter(
          (doctor) =>
            doctor.roleID === 1 &&
            (doctor.first_name
              .toLocaleLowerCase()
              .startsWith(filter.toLocaleLowerCase()) ||
              doctor.id
                .toString()
                .toLocaleLowerCase()
                .startsWith(filter.toLocaleLowerCase()) ||
              doctor.last_name
                .toLocaleLowerCase()
                .startsWith(filter.toLocaleLowerCase()) ||
              doctor.mail
                .toLocaleLowerCase()
                .startsWith(filter.toLocaleLowerCase()) ||
              doctor.phone
                .toString()
                .toLocaleLowerCase()
                .startsWith(filter.toLocaleLowerCase()))
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
            width: "20%",
            overflow: "hidden",
          }}
        ></Column>
      </DataTable>
    </>
  );
};

export default ListDoctor;
