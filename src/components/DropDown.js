import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import "./Header.css";

function DropDown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <FiAlignJustify
        className="dropbtn"
        sx={{ fontSize: 32 }}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        <Link className="links" to="/">
          Home
        </Link>
        <Link className="links" to="/story">
          Story
        </Link>
        <Link className="links" to="/dolls">
          Dolls
        </Link>
        <Link className="links" to="/hoops">
          Hoops
        </Link>
        <Link className="links" to="/facts/PsychologicalFacts">
          Psychological Facts
        </Link>
      </div>
    </div>
  );
}

export default DropDown;
