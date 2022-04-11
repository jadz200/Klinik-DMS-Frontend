import React, { useEffect } from "react";
import { useDeleteSecretaryData } from "../../hooks/Queries/useSecretariesData";
import ToolBar from "../../components/ToolBar/ToolBar";
import { Outlet } from "react-router-dom";
import { useStore } from "../../hooks/Store/useStore";

const Secretary = () => {
  const { mutate: deleteSecretary } = useDeleteSecretaryData();
  const resetEverything = useStore((state) => state.resetEverything);

  useEffect(() => {
    resetEverything();
  }, []);

  return (
    <>
      <ToolBar moduleName={"Secretary"} deleteFunction={deleteSecretary} />
      <div className="px-3 py-3 " style={{ height: "calc(100vh - 8rem)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Secretary;
