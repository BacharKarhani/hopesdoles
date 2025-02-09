import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";
import "../Dashboard/SideBar.css";
import Logo from "../images/DollsLogo.png";

export default function Sidebar() {
  const [showNav, setShowNav] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href("/");
  };
  return (
    <div className="dashboard_sidebar">
      <div className="dashboard_navbar">
        <header className="dashboard_header">
          <div className="header_title">
            <img src={Logo} />
          </div>
          {showNav ? (
            <MdClose onClick={() => setShowNav(false)} />
          ) : (
            <GiHamburgerMenu onClick={() => setShowNav(true)} />
          )}
        </header>

        <div className={showNav ? "sidenav active" : "sidenav"}>
          <ul className="sidebar_ul">
            <li className="sidebar_li">
              <Link
                className="sidebar_links"
                to="/dashboard/admins"
                onClick={() => setShowNav(false)}
              >
                Admins
              </Link>
            </li>
            <li className="sidebar_li">
              <Link
                className="sidebar_links"
                to="/dashboard/categories"
                onClick={() => setShowNav(false)}
              >
                Categories
              </Link>
            </li>
            <li className="sidebar_li">
              <Link
                className="sidebar_links"
                to="/dashboard/collections"
                onClick={() => setShowNav(false)}
              >
                Collection
              </Link>
            </li>
            <li>
              <Link
                className="sidebar_links"
                to="/dashboard/orders"
                onClick={() => setShowNav(false)}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                className="sidebar_links"
                to="/dashboard/products/dolls"
                onClick={() => setShowNav(false)}
              >
                Products dolls
              </Link>
            </li>
            <li>
              <Link
                className="sidebar_links"
                to="/dashboard/products/hoops"
                onClick={() => setShowNav(false)}
              >
                Products hoops
              </Link>
            </li>
            <li>
              <Link
                className="sidebar_links"
                to="/dashboard/about"
                onClick={() => setShowNav(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="sidebar_links"
                to="/dashboard/videos"
                onClick={() => setShowNav(false)}
              >
                Videos
              </Link>
            </li>
            <li>
              <Link
                className="sidebar_links"
                to="/dashboard/emails"
                onClick={() => setShowNav(false)}
              >
                Emails
              </Link>
            </li>
            <li>
              <Link
                className="sidebar_links"
                to="/dashboard/coupons"
                onClick={() => setShowNav(false)}
              >
                Coupons
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="sidebar_links"
                onClick={() => logout()}
              >
                <AiOutlinePoweroff /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
