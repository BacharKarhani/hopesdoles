import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dolls from "./pages/Dolls";
import Hoops from "./pages/Hoops";
import PsychologicalFacts from "./pages/PsychologicalFacts";
import FillDolls from "./pages/FillDolls";
import DollsHouse from "./pages/DollsHouse";
import UserLogin from "./pages/UserLogin";
import NotFound from "./pages/NotFound";
import Story from "./pages/Story";
import DollById from "./pages/DollById";
import CheckOut from "./pages/Checkout/Checkout.jsx";
import Cart from "./pages/Cart/Cart";
import Settings from "./pages/Settings/Settings";
import axios from "axios";
import Flag from "react-world-flags";
import URLs from "./config/urls.js";

function App() {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const modalOverlayStyle = {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-out",
  };

  const modalContentStyle = {
    background: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    maxWidth: "90%",
    width: "400px",
    opacity: 0,
    transform: "scale(0.8)",
    animation: "fadeInScale 0.3s ease-out forwards",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
  };

  const buttonStyle = {
    padding: "12px 20px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.3s ease, background 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const lebanonBtnStyle = {
    ...buttonStyle,
    background: "#faaf3e",
    color: "white",
  };

  const outsideBtnStyle = {
    ...buttonStyle,
    background: "#faaf3e",
    color: "white",
  };

  const modalAnimationStyle = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  
    .animated-button:hover {
      transform: scale(1.1);
    }
  `;

  const StyleTag = () => <style>{modalAnimationStyle}</style>;

  useEffect(() => {
    getCategories();
    checkUser();
    checkUserLocation();
  }, []);

  const checkUserLocation = () => {
    const storedLocation = localStorage.getItem("inLebanon");

    if (storedLocation === null) {
      setShowLocationModal(true);
    } else {
      setCountry(storedLocation === "true" ? "Lebanon" : "Outside Lebanon");
    }
  };

  const handleLocationSelect = (location) => {
    const isLebanon = location === "Lebanon";
    localStorage.setItem("inLebanon", isLebanon);
    setCountry(location);
    setShowLocationModal(false);
  };

  const getCategories = async () => {
    try {
      let res = await axios.get(URLs.CATEGORIES);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  

  const checkUser = () => {
    setUser(localStorage.getItem("user") !== null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      {showLocationModal && (
        <>
          <StyleTag /> {/* Inject animation styles */}
          <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
              <h2>Where do you live?</h2>
              <div style={buttonContainerStyle}>
                <button
                  style={lebanonBtnStyle}
                  className="animated-button"
                  onClick={() => handleLocationSelect("Lebanon")}
                >
                  <Flag code="LB" className="inline-block w-6 h-4 mr-1" />
                  In Lebanon
                </button>
                <button
                  style={outsideBtnStyle}
                  className="animated-button"
                  onClick={() => handleLocationSelect("Outside Lebanon")}
                >
                  🌎 Outside Lebanon
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <Routes>
        <Route index path="/" element={<Home />} />
        {localStorage.getItem("token") !== null ? (
          <Route index path="/dashboard/*" element={<Dashboard />} />
        ) : (
          <Route path="*" element={<NotFound />} />
        )}
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/loading" element={<Loader />} />
        <Route path="/story" element={<Story />} />
        <Route path="/facts/:name" element={<PsychologicalFacts />} />
        <Route path="/filldoll/:name" element={<FillDolls />} />
        <Route path="/dollhouse/:name" element={<DollsHouse />} />
        <Route path="/product/:id" element={<DollById />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        {categories.map((each) => {
          return each.name === "dolls" ? (
            <Route
              key={each._id}
              path="/dolls"
              element={<Dolls id={each._id} />}
            />
          ) : (
            <Route
              key={each._id}
              path="/hoops"
              element={<Hoops id={each._id} />}
            />
          );
        })}
        {user ? (
          <Route element={<Settings />} path="/settings" />
        ) : (
          <Route path="/settings" element={<NotFound />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
