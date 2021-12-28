import React from "react";
import { Container } from "@material-ui/core";

const Layout = ({ title = "Title", description = "Description", children }) => {
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
