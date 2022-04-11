import React, { useEffect } from "react";
import { useDeleteRoomData } from "../../hooks/Queries/useRoomsData";
import ToolBar from "../../components/ToolBar/ToolBar";
import { Outlet } from "react-router-dom";
import { useStore } from "../../hooks/Store/useStore";

const Room = () => {
  const { mutate: deleteRoom } = useDeleteRoomData();
  const resetEverything = useStore((state) => state.resetEverything);

  useEffect(() => {
    resetEverything();
  }, []);
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
