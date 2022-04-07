import React from "react";

import { Dialog } from "primereact/dialog";
import { useParams } from "react-router-dom";

const ViewEditDeleteDialog = ({ visible, setVisible }) => {
  const { id } = useParams();
  return (
    <Dialog
      header="Appointment"
      visible={visible}
      onHide={() => {
        setVisible(false);
      }}
      style={{ width: "50vw" }}
    >
      {id}
    </Dialog>
  );
};

export default ViewEditDeleteDialog;
