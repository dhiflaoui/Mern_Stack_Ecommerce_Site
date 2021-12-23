import React from "react";

const Layout = ({ title = "Title", description = "Description", children }) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
