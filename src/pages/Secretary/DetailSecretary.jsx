import React from "react";
import { useParams } from "react-router-dom";
import { useSecretaryData } from "../../hooks/Queries/useSecretaryData";

const DetailSecretary = () => {
  const { id } = useParams();
  const { isLoading, data, error, isError } = useSecretaryData(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default DetailSecretary;
