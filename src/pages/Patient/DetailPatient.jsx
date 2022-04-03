import React from "react";
import { useParams } from "react-router-dom";
import { usePatientData } from "../../hooks/Queries/usePatientData";

const DetailPatient = () => {
  const { id } = useParams();
  console.log(id);
  const { isLoading, data, error, isError } = usePatientData(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default DetailPatient;
