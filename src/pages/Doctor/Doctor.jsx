import React, { useEffect } from "react";
import { useDeleteDoctorData } from "../../hooks/Queries/useDoctorsData";
import { Outlet } from "react-router-dom";
import ToolBar from "../../components/ToolBar/ToolBar";
import { useStore } from "../../hooks/Store/useStore";

const Doctor = () => {
  const { mutate: deleteDoctor } = useDeleteDoctorData();

  const resetEverything = useStore((state) => state.resetEverything);

  useEffect(() => {
    resetEverything();
  }, []);

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
