//Hooks
import React, { useRef, useState } from "react";

//Components
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Sidebar } from "primereact/sidebar";

const TopBar = () => {
  const [visible, setVisible] = useState(false);
  const searchOverlay = useRef(null);
  const inboxOverlay = useRef(null);
  const chatOverlay = useRef(null);
  const iconSize = "text-xl";
  return (
    <>
      <div></div>
      <div className="flex">
        <Button
          icon={`pi pi-search ${iconSize} `}
          className="p-button-rounded p-button-text mx-2"
          onClick={(e) => searchOverlay.current.toggle(e)}
        />
        <Button
          icon={`pi pi-inbox ${iconSize} `}
          className="p-button-rounded p-button-text mx-2"
          onClick={(e) => inboxOverlay.current.toggle(e)}
        />
        <Button
          icon={`pi pi-list ${iconSize} `}
          className="p-button-rounded p-button-text mx-2"
          onClick={(e) => chatOverlay.current.toggle(e)}
        />
        <Button
          icon={`pi pi-user ${iconSize} `}
          className="p-button-rounded p-button-text mx-2"
          onClick={() => setVisible(true)}
        />
      </div>
      <OverlayPanel ref={searchOverlay}>Search</OverlayPanel>
      <OverlayPanel ref={inboxOverlay}>Inbox / Notifications</OverlayPanel>
      <OverlayPanel ref={chatOverlay}>Chat</OverlayPanel>
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        Profile Info
      </Sidebar>
    </>
  );
};

export default TopBar;
