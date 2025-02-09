import React, { useState } from "react";
import "../pages/Login.css";
import Launcher from "../images/undraw_maker_launch_re_rq81.svg";
import Register from "../images/undraw_designer_life_re_6ywf.svg";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Login() {
  const navigate = useNavigate();
  toast.configure();
  useEffect(() => {
    const sign_in_btn = document.getElementById("sign-in-btn");
    const sign_up_btn = document.getElementById("sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }, []);
  const [adminlogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });
  const loginHandleChange = (e) => {
    let { name, value } = e.target;
    setAdminLogin({ ...adminlogin, [name]: value });
  };
  const loginHandleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: adminlogin.email,
      password: adminlogin.password,
    };
    axios
      .post(`https://api.hopesdolls.com/api/admins/login`, data, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAdminLogin({
            email: "",
            password: "",
          });
          toast.success("Logged In Successfully");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.admin.id);
          navigate("/dashboard/admins");
          window.location.reload("");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Logging in");
      });
  };

  const [admin, setAdmins] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setAdmins({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminData = {
      name: admin.name,
      email: admin.email,
      password: admin.password,
      phone: admin.phone,
    };
    axios
      .post(`https://api.hopesdolls.com/api/admins/signup`, adminData, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Registered Successfully");
          setAdmins({
            name: "",
            email: "",
            password: "",
            phone: "",
          });
          toast.success("Registered Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong while registering");
      });
  };
  return (
    <>
      <Header />

      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            {/*Sign In Form / Login Form */}
            <form onSubmit={loginHandleSubmit} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="email"
                  name="email"
                  onChange={loginHandleChange}
                  value={adminlogin.email}
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  onChange={loginHandleChange}
                  value={adminlogin.password}
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn solid">
                Login
              </button>
            </form>

            {/**Register / Sign Up Form */}
            <form onSubmit={handleSubmit} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="name"
                  value={admin.name}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  name="phone"
                  value={admin.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
              </div>
              <button type="submit" className="btn">
                Sign In
              </button>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                {"if you don't have an account you can Register".toUpperCase()}
              </p>
              <button className="btn transparent" id="sign-up-btn">
                {" "}
                Sign up{" "}
              </button>
            </div>
            <img src={Launcher} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                {"if you already have an account click the button below and".toUpperCase()}
              </p>
              <button className="btn transparent" id="sign-in-btn">
                {" "}
                Sign in{" "}
              </button>
            </div>
            <img src={Register} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
