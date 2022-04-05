import React from "react";
import { useDeleteSecretaryData } from "../../hooks/Queries/useSecretariesData";
import ToolBar from "../../components/ToolBar/ToolBar";
import { Outlet } from "react-router-dom";

const Secretary = () => {
  const { mutate: deleteSecretary } = useDeleteSecretaryData();

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
