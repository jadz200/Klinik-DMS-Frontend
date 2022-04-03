import React from "react";
//Library Imports
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const Edit = ({ moduleName }) => {
  let navigate = useNavigate();
  return (
    <>
      <Button
        label="Submit"
        icon="pi pi-check"
        iconPos="right"
        className="p-button-sm"
        type="submit"
        form={`edit${moduleName}`}
      />
      <Button
        label="Cancel"
        icon="pi pi-times"
        iconPos="right"
        className="p-button-sm p-button-secondary p-button-outlined"
        onClick={() => {
          navigate(-1);
        }}
      />
    </>
  );
};

export default Edit;
