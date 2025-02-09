import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../images/DollsLogo.png";
import PersonIcon from "@mui/icons-material/Person";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DropDown from "./DropDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Flag from "react-world-flags";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function Header() {
  const [user, setUser] = useState(false);
  const [inLebanon, setInLebanon] = useState(true);

  useEffect(() => {
    getUser();
    
    const storedLocation = localStorage.getItem("inLebanon");
  
    if (storedLocation === null) {
      localStorage.setItem("inLebanon", "true");
      setInLebanon(true);
    } else {
      setInLebanon(storedLocation === "true");
    }
  }, []);
  

  const getUser = () => {
    setUser(localStorage.getItem("user") !== null);
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value === "Lebanon";
    setInLebanon(selectedLocation);
    localStorage.setItem("inLebanon", selectedLocation); // Update only when user changes
  };

  return (
    <div>
      <div>
        <div className="top-header">
          <div className="start-p">
            <a
              className="whatsapp-header-link"
              href="/"
              rel="noopener noreferrer"
            >
              <img src={logo} width={100} height={100} alt="Logo" />
            </a>
          </div>

          <div className="end-p">
            <div className="location-container">
              <p className="location-label">Location:</p>
              <FormControl className="location-select">
                <Select
                  value={inLebanon ? "Lebanon" : "Outside"}
                  onChange={handleLocationChange}
                  displayEmpty
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    padding: "5px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  <MenuItem value="Lebanon">
                    <Flag code="LB" className="inline-block w-6 h-4 mr-1" />
                    <span className="location-text">Lebanon</span>
                  </MenuItem>
                  <MenuItem value="Outside">
                    🌎 <span className="location-text">Outside Lebanon</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            {user ? (
              <NavLink
                to="/settings"
                className="end-p"
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="account">
                  <PersonIcon />
                </div>
                <div className="account-arrow">
                  Settings
                  <ArrowDropDownIcon />
                </div>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 20px",
                  backgroundColor: "#faaf3e",
                  textDecoration: "none",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "#faaf3e";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#faaf3e";
                  e.target.style.color = "white";
                }}
              >
                Login
              </NavLink>
            )}

            <div className="ShoppingCartIcon-responsive">
              <NavLink to="/cart" style={{ color: "#faaf3e" }}>
                <ShoppingCartOutlinedIcon style={{ color: "#faaf3e" }} />
                <div className="cart-icon" style={{ color: "#faaf3e" }} />
              </NavLink>
            </div>

            <DropDown />
          </div>
        </div>
        <div className="header-sentence text-lg font-medium">
          <Flag code="LB" className="inline-block w-6 h-4 mr-1" /> Lebanon
          Delivery $3 | 🌎 Worldwide Shipping: $8
        </div>
      </div>

      <div className="logo-img">
        <div className="ShoppingCartIcon">
          <NavLink to="/cart" style={{ display: "grid" }}>
            <ShoppingCartOutlinedIcon />
            <div className="cart-icon">1</div>
          </NavLink>
        </div>
      </div>

      <div className="menu">
        <ul>
          <li>
            <NavLink
              className="links"
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#e97436" : "inherit",
              })}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="links"
              to="/story"
              style={({ isActive }) => ({
                color: isActive ? "#e97436" : "inherit",
              })}
            >
              Story
            </NavLink>
          </li>
          <li>
            <NavLink
              className="links"
              to="/dolls"
              style={({ isActive }) => ({
                color: isActive ? "#e97436" : "inherit",
              })}
            >
              Dolls
            </NavLink>
          </li>
          <li>
            <NavLink
              className="links"
              to="/hoops"
              style={({ isActive }) => ({
                color: isActive ? "#e97436" : "inherit",
              })}
            >
              Hoops
            </NavLink>
          </li>
          <li>
            <NavLink
              className="links"
              to="/facts/PsychologicalFacts"
              style={({ isActive }) => ({
                color: isActive ? "#e97436" : "inherit",
              })}
            >
              Psychological Facts
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
