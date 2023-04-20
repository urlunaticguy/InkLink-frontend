import React from "react";
import NavbarAgency from "./Dashboard/Agency/Navbar";
import AppBar from "./Dashboard/AppBar";

function DashboardHomeAgency() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundColor: "transparent",
      }}
    >
      <NavbarAgency name="HOME" type="Agency" />
      <AppBar title="Home" />
    </div>
  );
}

export default DashboardHomeAgency;
