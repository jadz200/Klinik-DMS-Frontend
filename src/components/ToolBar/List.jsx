import React, { useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/Store/useStore";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const List = ({ deleteFunction }) => {
  const toast = useRef(null);
  const accept = () => {
    toast.current.show({
      severity: "error",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
    selectedItems.forEach((item) => {
      deleteFunction(item.id);
    });
    removeAllSelecetedItems();
  };
  const confirmDelete = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
    });
  };
  let navigate = useNavigate();
  let setFilter = useStore((state) => state.setFilter);
  let filter = useStore((state) => state.filter);
  let selectedItems = useStore((state) => state.selectedItems);
  let removeAllSelecetedItems = useStore(
    (state) => state.removeAllSelecetedItems
  );
  const canEditOrView = selectedItems.length === 1;
  const canDelete = selectedItems.length >= 1;
  console.log(selectedItems);
  return (
    <>
      <Toast ref={toast} />
      <Button
        label="Create"
        icon="pi pi-check"
        iconPos="right"
        className="p-button-sm p-button-success"
        onClick={() => {
          navigate("create");
          removeAllSelecetedItems();
        }}
      />
      <Button
        label="Edit"
        icon="pi pi-pencil"
        iconPos="right"
        className="p-button-sm p-button-warning"
        disabled={!canEditOrView}
        onClick={() => {
          let id = selectedItems[0].id;
          console.log(id);
          navigate(`${id}/edit`);
          removeAllSelecetedItems();
        }}
      />
      <Button
        label="View"
        icon="pi pi-eye"
        iconPos="right"
        className="p-button-sm"
        disabled={!canEditOrView}
        onClick={() => {
          let id = selectedItems[0].id;
          console.log(id);
          navigate(`${id}/detail`);
          removeAllSelecetedItems();
        }}
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        iconPos="right"
        className="p-button-sm p-button-danger"
        disabled={!canDelete}
        onClick={confirmDelete}
      />

      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
          className="p-inputtext-sm"
        />
      </span>
    </>
  );
};

export default List;
