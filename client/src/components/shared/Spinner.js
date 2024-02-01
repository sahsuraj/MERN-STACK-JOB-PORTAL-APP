import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center" style={{ marginTop: "10%" }}>
      <div className="spinner-border spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>


  );
};

export default Spinner;
