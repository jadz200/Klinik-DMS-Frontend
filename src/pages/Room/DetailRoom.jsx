import React from "react";
import { useParams } from "react-router-dom";
import { useRoomData } from "../../hooks/Queries/useRoomData";

const DetailRoom = () => {
  const { id } = useParams();
  const { isLoading, data, error, isError } = useRoomData(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default DetailRoom;
