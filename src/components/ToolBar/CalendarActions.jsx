import React from "react";
import { Button } from "primereact/button";

const CalendarActions = () => {
  return (
    <>
      <Button
        label="Create"
        icon="pi pi-check"
        iconPos="right"
        className="p-button-sm p-button-success"
        onClick={() => {
          console.log("Create");
        }}
      />
      <Button
        label="Edit"
        icon="pi pi-pencil"
        iconPos="right"
        className="p-button-sm p-button-warning"
        onClick={() => {
          console.log("Edit");
        }}
      />
      <Button
        label="View"
        icon="pi pi-eye"
        iconPos="right"
        className="p-button-sm"
        onClick={() => {
          console.log("View");
        }}
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        iconPos="right"
        className="p-button-sm p-button-danger"
        onClick={() => {
          console.log("Delete");
        }}
      />
    </>
  );
};

export default CalendarActions;
