import React from "react";
import { useSecretariesData } from "../../hooks/Queries/useSecretariesData";
import { useStore } from "../../hooks/Store/useStore";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ListSecretary = () => {
  let selectedItems = useStore((state) => state.selectedItems);
  let setSelectedItems = useStore((state) => state.setSelectedItems);
  let filter = useStore((state) => state.filter);
  const { isLoading, data: secretaries, isError, error } = useSecretariesData();

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
        value={secretaries.filter(
          (secretary) =>
            secretary.roleID === 2 &&
            (secretary.first_name
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
              secretary.id
                .toString()
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase()) ||
              secretary.last_name
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase()) ||
              secretary.email
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase()) ||
              secretary.phone
                .toString()
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase()))
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
          header="Staff ID"
          style={{ width: "10%" }}
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
          style={{ width: "20%" }}
          sortable
        ></Column>
        <Column
          field="phone"
          header="Phone Number"
          style={{ width: "20%" }}
          sortable
        ></Column>
        <Column
          field="email"
          header="Email"
          style={{
            width: "30%",
          }}
          sortable
        ></Column>
      </DataTable>
    </>
  );
};

export default ListSecretary;
