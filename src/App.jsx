//Hooks
import React, { useState, useLayoutEffect } from "react";

//Component Imports
import TopBar from "@components/Navigation/TopBar";
import SideBar from "@components/Navigation/SideBar";
import Login from "@pages/Access/Login";
import ListPatient from "@pages/Patient/ListPatient";
import EditPatient from "@pages/Patient/EditPatient";
import CreatePatient from "@pages/Patient/CreatePatient";
import Patient from "@pages/Patient/Patient";
import DetailPatient from "@pages/Patient/DetailPatient";

//Library Imports
import { Routes, Route } from "react-router-dom";
import Doctor from "./pages/Doctor/Doctor";
import ListDoctor from "./pages/Doctor/ListDoctor";
import EditDoctor from "./pages/Doctor/EditDoctor";
import DetailDoctor from "./pages/Doctor/DetailDoctor";
import CreateDoctor from "./pages/Doctor/CreateDoctor";

function App() {
  // Login to show which page to show
  const [login, setLogin] = useState(false);
  useLayoutEffect(() => {
    console.log(localStorage.getItem("visited"));
    if (localStorage.getItem("visited")) {
      setLogin(true);
    }
  }, []);

  //Side Bar collapse styling
  const [sideBar, setSideBar] = useState(true);
  const width = sideBar ? "w-12rem" : "w-4rem";
  if (!login) {
    return (
      <>
        <Login setLogin={setLogin} />
      </>
    );
  }
  return (
    <>
      <div className="grid grid-nogutter flex-nowrap">
        <div className={`col-fixed shadow-8 sidebar ${width}`}>
          <SideBar sideBar={sideBar} setSideBar={setSideBar} />
        </div>
        <div className="col">
          <div className="flex flex-column">
            <div className="h-4rem py-2 px-4 flex justify-content-between align-items-center align-items-center topbar">
              <TopBar />
            </div>
            <div className="main-content">
              <Routes>
                <Route path="patient" element={<Patient />}>
                  <Route index element={<ListPatient />}></Route>
                  <Route path=":id/edit" element={<EditPatient />}></Route>
                  <Route path=":id/detail" element={<DetailPatient />}></Route>
                  <Route path="create" element={<CreatePatient />}></Route>
                </Route>
                <Route path="doctor" element={<Doctor />}>
                  <Route index element={<ListDoctor />}></Route>
                  <Route path=":id/edit" element={<EditDoctor />}></Route>
                  <Route path=":id/detail" element={<DetailDoctor />}></Route>
                  <Route path="create" element={<CreateDoctor />}></Route>
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
