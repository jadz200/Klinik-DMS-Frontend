import React from "react";
import { useRoomsData } from "../../hooks/Queries/useRoomsData";
import { useStore } from "../../hooks/Store/useStore";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ListRoom = () => {
  let selectedItems = useStore((state) => state.selectedItems);
  let setSelectedItems = useStore((state) => state.setSelectedItems);
  let filter = useStore((state) => state.filter);
  const { isLoading, data: rooms, isError, error } = useRoomsData();

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
        value={rooms.filter(
          (room) =>
            room.id
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            room.title
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
        <Column selectionMode="multiple" style={{ width: "10%" }}></Column>
        <Column
          field="id"
          header="ID"
          style={{ width: "10%" }}
          sortable
        ></Column>
        <Column
          field="clinicID"
          header="Clinic ID"
          style={{ width: "10%" }}
          sortable
        ></Column>
        <Column
          field="title"
          header="Room Name"
          style={{ width: "70%" }}
          sortable
        ></Column>
      </DataTable>
    </>
  );
};

export default ListRoom;
