import React, { useState } from "react";

import { Dialog } from "primereact/dialog";
import { useParams } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";
import ViewAppointment from "./ViewAppointment";
import EditAppointment from "./EditAppointment";
import { useAppointmentData } from "../../hooks/Queries/useAppointmentData";
import { Button } from "primereact/button";
import { useDeleteAppointmentData } from "../../hooks/Queries/useAppointmentsData";

const ViewEditDeleteDialog = ({ visible, setVisible }) => {
  const { id } = useParams();
  const { data, isLoading, isError, Error } = useAppointmentData(id);
  const { mutate: deleteAppointment } = useDeleteAppointmentData();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: "View", icon: "pi pi-fw pi-eye" },
    { label: "Edit", icon: "pi pi-fw pi-pencil" },
  ];
  const footer = (
    <div>
      {activeIndex === 0 ? (
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => {
            deleteAppointment(id);
            setVisible(false);
          }}
        />
      ) : (
        <Button
          label="Edit"
          form="editAppointment"
          icon="pi pi-pencil"
          className="p-button-warning"
          type="submit"
        />
      )}
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={() => {
          setVisible(false);
        }}
      />
    </div>
  );
  if (isError) {
    return <div>{JSON.stringify(Error)}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <Dialog
      header="Appointment"
      visible={visible}
      footer={footer}
      onHide={() => {
        setVisible(false);
      }}
      style={{ width: "50vw" }}
    >
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />
      {activeIndex === 0 ? (
        <ViewAppointment appointment={data} id={id} />
      ) : (
        <EditAppointment appointment={data} setVisible={setVisible} />
      )}
    </Dialog>
  );
};

export default ViewEditDeleteDialog;
