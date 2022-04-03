import React from "react";
//Components
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";

//Icons / Images
import { GiPerson } from "react-icons/gi";
import Logo from "@assets/images/Logo.png";

// eslint-disable-next-line react/prop-types
const SideBar = ({ sideBar, setSideBar }) => {
  const items = [
    {
      path: "/patient",
      text: "Patients",
      icon: <GiPerson />,
    },
  ];
  return (
    <div className="flex flex-column justify-content-between min-h-screen">
      <div className="flex flex-column">
        <div
          className={`flex justify-content-between align-content-center align-items-center sidebar-header py-1 h-4rem ${
            sideBar ? "pl-4" : "pl-2"
          } pr-2`}
        >
          {sideBar && <img src={Logo} height={35} alt="Logo" />}
          <Button
            icon={`pi ${
              sideBar ? "pi-angle-double-left" : "pi-angle-double-right"
            }`}
            className=" p-button-text btn-custom-primary"
            onClick={() => {
              setSideBar(!sideBar);
            }}
          />
        </div>
        {items.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.path}
              className="nav-item flex justify-content-between align-content-center align-items-center px-4 py-3 h-4rem text-xl"
            >
              <div className="nav-icon">{item.icon}</div>
              {sideBar && <div className="nav-text">{item.text}</div>}
            </NavLink>
          );
        })}
      </div>
      {sideBar && (
        <div className="m-2 text-base p-2 sidebar-footer border-round align-self-center">
          Klinic-DMS
        </div>
      )}
    </div>
  );
};

export default SideBar;
