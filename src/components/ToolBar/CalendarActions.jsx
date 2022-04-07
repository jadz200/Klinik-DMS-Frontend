import React from "react";
import { Button } from "primereact/button";

const CalendarActions = ({ setDialog }) => {
  return (
    <>
      <Button
        label="Create"
        icon="pi pi-check"
        iconPos="right"
        className="p-button-sm p-button-success"
        onClick={() => {
          setDialog(true);
        }}
      />
    </>
  );
};

export default CalendarActions;
