import React from "react";
import { useDoctorData } from "../../hooks/Queries/useDoctorData";
import { useParams } from "react-router-dom";

const DetailDoctor = () => {
  const { id } = useParams();
  const { isLoading, data, error, isError } = useDoctorData(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default DetailDoctor;
