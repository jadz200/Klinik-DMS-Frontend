import React from "react";
import { useDeleteDoctorData } from "../../hooks/Queries/useDoctorsData";
import { Outlet } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";

const Doctor = () => {
  const { mutate: deleteDoctor } = useDeleteDoctorData();

  return (
    <>
      <ToolBar moduleName={"Doctor"} deleteFunction={deleteDoctor} />
      <div className="px-3 py-3 " style={{ height: "calc(100vh - 8rem)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Doctor;
