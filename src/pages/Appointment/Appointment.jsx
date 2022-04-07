import React, { useEffect, useState } from "react";

import ToolBar from "../../components/ToolBar/ToolBar";
import "@fullcalendar/core/vdom";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import { useAppointmentsData } from "../../hooks/Queries/useAppointmentsData";
import { parseJSON } from "date-fns";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useNavigate } from "react-router-dom";
import CreateDialog from "./CreateDialog";
import ViewEditDeleteDialog from "./ViewEditDeleteDialog";

const Appointment = () => {
  const [displayCreateDialog, setdisplayCreateDialog] = useState(false);
  const [displayViewEditDeleteDialog, setdisplayViewEditDeleteDialog] =
    useState(false);
  let navigate = useNavigate();
  const {
    data: appointment,
    isLoading,
    isError,
    Error,
  } = useAppointmentsData();

  let formattedData = appointment?.map((appointment) => {
    let date = parseJSON(appointment.date).toISOString();
    let format = {
      start: date,
      title: appointment.reason,
      id: appointment.id,
    };
    return format;
  });

  useEffect(() => {
    if (appointment) {
      var calendarEl = document.getElementById("calendar");

      var calendar = new Calendar(calendarEl, {
        height: "100%",
        initialView: "dayGridMonth",
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        headerToolbar: {
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          end: "today prev,next",
        },
        eventClick: (e) => {
          navigate(e.event._def.publicId);
          setdisplayViewEditDeleteDialog(true);
        },

        events: formattedData,
      });
      calendar.render();
    }
  }, [appointment?.length]);

  if (isError) {
    return <div>{Error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ToolBar moduleName={"Appointment"} setDialog={setdisplayCreateDialog} />
      {/* Add Delete Function to ToolBar */}
      <div className="px-3 py-3 " style={{ height: "calc(100vh - 8rem)" }}>
        <div id="calendar"></div>
      </div>
      <CreateDialog
        visible={displayCreateDialog}
        setVisible={setdisplayCreateDialog}
      />
      <ViewEditDeleteDialog
        visible={displayViewEditDeleteDialog}
        setVisible={setdisplayViewEditDeleteDialog}
      />
    </>
  );
};

export default Appointment;
