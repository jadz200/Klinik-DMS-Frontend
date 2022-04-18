import React from "react";
import { useDoctorData } from "../../hooks/Queries/useDoctorData";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";

const DetailDoctor = () => {
  const { id } = useParams();
  const { isLoading, data, error, isError } = useDoctorData(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <Card>
      <div className="flex align-items-center align-content-center mb-4">
        <h3 className="underline">First Name:</h3>
        <p className="text-xl ml-4">{data.first_name}</p>
      </div>
      <div className="flex align-items-center align-content-center mb-4">
        <h3 className="underline">Last Name:</h3>
        <p className="text-xl ml-4">{data.last_name}</p>
      </div>
      <div className="flex align-items-center align-content-center mb-4">
        <h3 className="underline">Phone Number:</h3>
        <p className="text-xl ml-4">{data.phone}</p>
      </div>
      <div className="flex align-items-center align-content-center mb-4">
        <h3 className="underline">Email:</h3>
        <p className="text-xl ml-4">{data.mail}</p>
      </div>
    </Card>
  );
};

export default DetailDoctor;
