import React, { useEffect } from "react";
//Library imports
import { Outlet } from "react-router-dom";

//Component imports
import ToolBar from "../../components/ToolBar/ToolBar";
import { useDeletePatientData } from "../../hooks/Queries/usePatientsData";
import { useStore } from "../../hooks/Store/useStore";

const Patient = () => {
  const { mutate: deletePatient } = useDeletePatientData();
  const resetEverything = useStore((state) => state.resetEverything);

  useEffect(() => {
    resetEverything();
  }, []);

  return (
    <>
      <ToolBar moduleName={"Patient"} deleteFunction={deletePatient} />
      <div className="px-3 py-3 " style={{ height: "calc(100vh - 8rem)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Patient;
