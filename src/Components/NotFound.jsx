import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#333" }}>404</h1>
      <p style={{ fontSize: "2rem", color: "#666" }}>Page Not Found</p>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
    </div>
  );
};

export default NotFound;
