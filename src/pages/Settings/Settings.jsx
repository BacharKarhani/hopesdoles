import axios from "axios";
import "./settings.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [newPass, setNewPass] = useState({});
  const nav = useNavigate();
  const logout = () => {
    if (window.confirm("Are Your Sure You Want to Logout?")) {
      localStorage.clear();
      nav("/");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewPass({ ...newPass, [name]: value });
    console.log(newPass);
  };
  const [user, setUser] = useState({});
  const [id, setId] = useState("");

  const getData = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setId(user.id);
  };
  console.log(id);
  useEffect(() => {
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`https://api.hopesdolls.com/api/users/password/${id}`, newPass, {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        })
        .then((res) => {
          toast.success(res.data.msg);
          localStorage.setItem("user", JSON.stringify(res.data.data));
        });
    } catch (error) {
      toast.warning("something went wrong");
    }
  };
  return (
    <>
      <Header />
      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Change Password</h3>
          <div>
            <input
              type="password"
              id="pass"
              name="password"
              placeholder="Old Password"
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              id="pass"
              name="newpass"
              placeholder="New Password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </>
  );
};

export default Settings;
