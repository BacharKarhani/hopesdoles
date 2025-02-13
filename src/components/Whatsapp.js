import React from "react";
import "./Whatsapp.css";
import { ImWhatsapp } from "react-icons/im";

export default function whatsapp() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
      ></link>
      <a
        href="https://wa.me/96179318276"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImWhatsapp size={25} color="white" />
      </a>
    </div>
  );
}
