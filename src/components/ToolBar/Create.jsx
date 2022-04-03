import React from "react";
//Library Imports
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Create = ({ moduleName }) => {
  let navigate = useNavigate();
  return (
    <>
      <Button
        label="Submit"
        icon="pi pi-check"
        iconPos="right"
        className="p-button-sm"
        type="submit"
        form={`create${moduleName}`}
      />
      <Button
        label="Cancel"
        icon="pi pi-times"
        iconPos="right"
        className="p-button-sm p-button-secondary p-button-outlined"
        onClick={() => {
          console.log("ITS RUNNING");
          navigate(-1);
        }}
      />
    </>
  );
};

export default Create;
