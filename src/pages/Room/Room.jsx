import React from "react";
import { useDeleteRoomData } from "../../hooks/Queries/useRoomsData";
import ToolBar from "../../components/ToolBar/ToolBar";
import { Outlet } from "react-router-dom";

const Room = () => {
  const { mutate: deleteRoom } = useDeleteRoomData();
  return (
    <>
      <ToolBar moduleName={"Room"} deleteFunction={deleteRoom} />
      <div className="px-3 py-3 " style={{ height: "calc(100vh - 8rem)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Room;
