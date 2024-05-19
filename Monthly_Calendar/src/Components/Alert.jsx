import { React, useContext } from "react";
import WebContext from "../context/WebContext";

const Alert = () => {
  // Use the WebContext to access the showAlert state
  const context = useContext(WebContext);
  const { showAlert } = context;

  return (
    <>
      {/* Render the alert only if showAlert is true */}
      {showAlert && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "sticky",
            zIndex: "5",
            color: "red",
            backgroundColor: "white",
            height: "34px",
            borderRadius: "11px",
          }}
        >
          <p style={{ marginLeft: "14px" }}>Event Deleted Successfully</p>
        </div>
      )}
    </>
  );
};

export default Alert;
