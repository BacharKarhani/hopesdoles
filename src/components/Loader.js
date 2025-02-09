import React from "react";
import "../components/Loader.css";
function Loader() {
  return (
    <div className="loading">
      <div id="loader">
        <div id="shadow"></div>
        <div id="box"></div>
      </div>
    </div>
  );
}
export default Loader;
