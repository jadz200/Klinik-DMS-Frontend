import React from "react";

const ViewAppointment = ({ appointment, id }) => {
  return (
    <div>
      {JSON.stringify(appointment)} {id}
    </div>
  );
};

export default ViewAppointment;
