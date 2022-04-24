import React from "react";

//Library Imports
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "primereact/button";

const Detail = ({ deleteFunction }) => {
  let navigate = useNavigate();
  let { id } = useParams();

  const location = useLocation();

  const showCUD =
    location.pathname.includes("doctor") ||
    location.pathname.includes("secretary");

  return (
    <>
      {!showCUD && (
        <>
          <Button
            label="Edit"
            icon="pi pi-pencil"
            iconPos="right"
            className="p-button-sm mx-2 p-button-warning"
            onClick={() => {
              navigate(`${id}/edit`);
            }}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            iconPos="right"
            className="p-button-danger p-button-sm mx-2"
            onClick={() => {
              deleteFunction(id);
              navigate("/patient");
            }}
          />
        </>
      )}
    </>
  );
};

export default Detail;
