import React, { useEffect } from "react";

import ToolBar from "../../components/ToolBar/ToolBar";
import "@fullcalendar/core/vdom";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import { useAppointmentsData } from "../../hooks/Queries/useAppointmentsData";
import { parseJSON } from "date-fns";
import timeGridPlugin from "@fullcalendar/timegrid";

const Appointment = () => {
  const { data, isLoading, isError, Error } = useAppointmentsData();
  console.log(data);
  if (data) {
    let date = parseJSON(data[0].date);
    console.log(date.toISOString());
    console.log(typeof date);
  }
  let formattedData = data?.map((app) => {
    let date = parseJSON(app.date).toISOString();
    let format = {
      start: date,
      title: app.reason,
    };
    return format;
  });
  console.log(formattedData);

  useEffect(() => {
    if (data) {
      var calendarEl = document.getElementById("calendar");

      var calendar = new Calendar(calendarEl, {
        height: "100%",
        initialView: "dayGridMonth",
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        headerToolbar: {
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          end: "today prev,next",
        },
        dateClick: (e) => {
          console.log(e);
        },

        events: formattedData,
      });
      calendar.render();
    }
  }, [data?.length]);

  if (isError) {
    return <div>{Error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ToolBar moduleName={"Appointment"} />
      {/* Add Delete Function to ToolBar */}
      <div className="px-3 py-3 " style={{ height: "calc(100vh - 8rem)" }}>
        <div id="calendar"></div>
      </div>
    </>
  );
};

export default Appointment;
