import React, { useRef } from "react";
import { Button } from "primereact/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../../hooks/Store/useStore";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const List = ({ deleteFunction }) => {
  const location = useLocation();

  const showCUD =
    location.pathname.includes("doctor") ||
    location.pathname.includes("secretary");
  console.log(showCUD);

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
  let selectedItems = useStore((state) => state.selectedItems);
  let removeAllSelecetedItems = useStore(
    (state) => state.removeAllSelecetedItems
  );
  const canEditOrView = selectedItems.length === 1;
  const canDelete = selectedItems.length >= 1;
  return (
    <>
      <Toast ref={toast} />
      {!showCUD && (
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
      )}
      {!showCUD && (
        <Button
          label="Edit"
          icon="pi pi-pencil"
          iconPos="right"
          className="p-button-sm p-button-warning"
          disabled={!canEditOrView}
          onClick={() => {
            let id = selectedItems[0].id;
            navigate(`${id}/edit`);
            removeAllSelecetedItems();
          }}
        />
      )}
      <Button
        label="View"
        icon="pi pi-eye"
        iconPos="right"
        className="p-button-sm"
        disabled={!canEditOrView}
        onClick={() => {
          let id = selectedItems[0].id;
          navigate(`${id}/detail`);
          removeAllSelecetedItems();
        }}
      />
      {!showCUD && (
        <Button
          label="Delete"
          icon="pi pi-trash"
          iconPos="right"
          className="p-button-sm p-button-danger"
          disabled={!canDelete}
          onClick={confirmDelete}
        />
      )}
    </>
  );
};

export default List;
