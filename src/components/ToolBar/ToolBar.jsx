//Base Imports
import React, { useEffect, useState } from "react";

//Library Imports
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useStore } from "../../hooks/Store/useStore";
import { InputText } from "primereact/inputtext";

//Component Imports
import List from "./List";
import Create from "./Create";
import Edit from "./Edit";
import Detail from "./Detail";
import CalendarActions from "./CalendarActions";

const ToolBar = ({ moduleName, deleteFunction, setDialog }) => {
  let [crudState, setCrudState] = useState("list");
  let navigate = useNavigate();
  let location = useLocation();
  // let prefix = "";
  // if (crudState === "create") {
  //   prefix = "Create ";
  // } else if (crudState === "edit") {
  //   prefix = "Edit ";
  // } else if (crudState === "detail") {
  //   prefix = "View ";
  // } else {
  //   prefix = "";
  // }

  let setFilter = useStore((state) => state.setFilter);
  let filter = useStore((state) => state.filter);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("create")) {
      setCrudState("create");
    } else if (path.includes("edit")) {
      setCrudState("edit");
    } else if (path.includes("detail")) {
      setCrudState("detail");
    } else {
      setCrudState("list");
    }
  }, [location.pathname]);

  return (
    <div className="header-main-content bg-white h-4rem pr-4 pl-1 py-2 flex justify-content-between align-items-center sticky top-0">
      {crudState !== "list" ? (
        <div>
          <Button
            icon="pi pi-angle-left text-2xl"
            className="p-button-rounded p-button-text"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
      ) : (
        <div className="ml-3">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search"
              className="p-inputtext-sm"
            />
          </span>
        </div>
      )}
      <div className="elements-gap">
        {moduleName !== "Appointment" ? (
          <>
            {crudState === "list" && (
              <List navigate={navigate} deleteFunction={deleteFunction} />
            )}
            {crudState === "create" && (
              <Create navigate={navigate} moduleName={moduleName} />
            )}
            {crudState === "edit" && (
              <Edit navigate={navigate} moduleName={moduleName} />
            )}
            {crudState === "detail" && (
              <Detail navigate={navigate} deleteFunction={deleteFunction} />
            )}
          </>
        ) : (
          <CalendarActions setDialog={setDialog} />
        )}
      </div>
    </div>
  );
};

export default ToolBar;
