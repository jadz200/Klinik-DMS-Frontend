import { Card } from "primereact/card";
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

  return (
    <Card>
      <div className="flex align-items-center align-content-center mb-4">
        <h3 className="underline">Title:</h3>
        <p className="text-xl ml-4">{data.title}</p>
      </div>
    </Card>
  );
};

export default DetailRoom;
