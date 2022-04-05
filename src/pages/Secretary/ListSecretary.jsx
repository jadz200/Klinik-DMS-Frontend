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
              .startsWith(filter.toLocaleLowerCase()) ||
              secretary.id
                .toString()
                .toLocaleLowerCase()
                .startsWith(filter.toLocaleLowerCase()) ||
              secretary.last_name
                .toLocaleLowerCase()
                .startsWith(filter.toLocaleLowerCase()) ||
              secretary.mail
                .toLocaleLowerCase()
                .startsWith(filter.toLocaleLowerCase()) ||
              secretary.phone
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

export default ListSecretary;
