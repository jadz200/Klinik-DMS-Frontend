//Hooks
import React, { useState, useLayoutEffect, useEffect } from "react";

//Component Imports
import TopBar from "@components/Navigation/TopBar";
import SideBar from "@components/Navigation/SideBar";
import Login from "@pages/Access/Login";
import ListPatient from "@pages/Patient/ListPatient";
import EditPatient from "@pages/Patient/EditPatient";
import CreatePatient from "@pages/Patient/CreatePatient";
import Patient from "@pages/Patient/Patient";
import DetailPatient from "@pages/Patient/DetailPatient";
import RequireAuth from "./utils/RequireAuth";

//Library Imports
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Doctor from "./pages/Doctor/Doctor";
import ListDoctor from "./pages/Doctor/ListDoctor";
import EditDoctor from "./pages/Doctor/EditDoctor";
import DetailDoctor from "./pages/Doctor/DetailDoctor";
import CreateDoctor from "./pages/Doctor/CreateDoctor";
import Secretary from "./pages/Secretary/Secretary";
import ListSecretary from "./pages/Secretary/ListSecretary";
import EditSecretary from "./pages/Secretary/EditSecretary";
import DetailSecretary from "./pages/Secretary/DetailSecretary";
import CreateSecretary from "./pages/Secretary/CreateSecretary";
import Appointment from "./pages/Appointment/Appointment";
import Room from "./pages/Room/Room";
import CreateRoom from "./pages/Room/CreateRoom";
import EditRoom from "./pages/Room/EditRoom";
import ListRoom from "./pages/Room/ListRoom";
import DetailRoom from "./pages/Room/DetailRoom";
import CreateVisit from "./pages/Visit/CreateVisit";
import EditVisit from "./pages/Visit/EditVisit";

function App() {
  // Login to show which page to show
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("patient");
    }
  }, [location.pathname]);

  const [login, setLogin] = useState(true);
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
                <Route path="login" element={<Login />} />
                <Route
                  path="patient"
                  element={
                    <RequireAuth>
                      <Patient />
                    </RequireAuth>
                  }
                >
                  <Route index element={<ListPatient />}></Route>
                  <Route path=":id/edit" element={<EditPatient />}></Route>
                  <Route path=":id/detail" element={<DetailPatient />}></Route>
                  <Route
                    path=":id/visit/create"
                    element={<CreateVisit />}
                  ></Route>
                  <Route
                    path=":id/detail/visit/:visitID/edit"
                    element={<EditVisit />}
                  />

                  <Route path="create" element={<CreatePatient />}></Route>
                </Route>
                <Route
                  path="doctor"
                  element={
                    <RequireAuth>
                      <Doctor />
                    </RequireAuth>
                  }
                >
                  <Route index element={<ListDoctor />}></Route>
                  <Route path=":id/edit" element={<EditDoctor />}></Route>
                  <Route path=":id/detail" element={<DetailDoctor />}></Route>
                  <Route path="create" element={<CreateDoctor />}></Route>
                </Route>
                <Route
                  path="secretary"
                  element={
                    <RequireAuth>
                      <Secretary />
                    </RequireAuth>
                  }
                >
                  <Route index element={<ListSecretary />}></Route>
                  <Route path=":id/edit" element={<EditSecretary />}></Route>
                  <Route
                    path=":id/detail"
                    element={<DetailSecretary />}
                  ></Route>
                  <Route path="create" element={<CreateSecretary />}></Route>
                </Route>
                <Route path="appointment" element={<Appointment />}>
                  <Route path=":id" />
                </Route>
                <Route
                  path="room"
                  element={
                    <RequireAuth>
                      <Room />
                    </RequireAuth>
                  }
                >
                  <Route index element={<ListRoom />}></Route>
                  <Route path=":id/edit" element={<EditRoom />}></Route>
                  <Route path=":id/detail" element={<DetailRoom />}></Route>
                  <Route path="create" element={<CreateRoom />}></Route>
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
