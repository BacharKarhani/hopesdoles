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
import "./App.css";
import DollById from "./pages/DollById";
import CheckOut from "./pages/Checkout/Checkout.jsx";
import Cart from "./pages/Cart/Cart";
import Settings from "./pages/Settings/Settings";
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getCategories();
    checkUser();
    fetchUserCountry();
  }, []);

  const fetchUserCountry = () => {
    const apiKey = "04aeba324d0b871f9d80887f60a39f5e";
    const ipstackUrl = `https://api.ipstack.com/check?access_key=${apiKey}`;

    axios
      .get(ipstackUrl)
      .then((response) => {
        const data = response.data;
        const userCountry = data.country_name;
        console.log(userCountry);
        if (userCountry === "Lebanon") {
          localStorage.setItem("lbc", true);
        } else {
          localStorage.setItem("lbc", false);
        }
        setCountry(userCountry);
      })
      .catch((error) => {
        console.error("Error fetching user's country:", error);
      });
  };

  const getCategories = async () => {
    try {
      let res = await axios.get("https://api.hopesdolls.com/api/categories", {
        headers: {
          "ngrok-skip-browser-warning": "asda",
        },
      });
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false once categories are fetched
    }
  };

  const checkUser = () => {
    localStorage.getItem("user") !== null ? setUser(true) : setUser(false);
  };

  if (loading) {
    return <Loader />; // Show loader while fetching data
  }

  return (
    <BrowserRouter>
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
        <Route path="/checkout" element={user ? <CheckOut /> : <UserLogin />} />
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
