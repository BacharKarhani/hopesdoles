import React, { useState } from "react";
import "../pages/Login.css";
import Launcher from "../images/undraw_maker_launch_re_rq81.svg";
import Register from "../images/undraw_designer_life_re_6ywf.svg";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import URLs from "../config/urls";

function UserLogin() {
  const [user, setUsers] = useState({});
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
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

  const [userLogin, setUserLogin] = useState({});
  const loginHandleChange = (e) => {
    let { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };
  const loginHandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(URLs.UserLogin, userLogin, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Logged In Successfully");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setTimeout(() => {
            navigate(redirect);
          }, 1500);
          console.log(redirect);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Logging in");
      });
  };

  const handleChange = (e) => {
    let { name } = e.target;
    setUsers({ ...user, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(URLs.UserSignup, user, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Registered Successfully");
          toast.success("Registered Successfully");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate(`${redirect}`);
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
                  value={userLogin.email}
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  onChange={loginHandleChange}
                  value={userLogin.password}
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
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
              </div>
              <button type="submit" className="btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
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

export default UserLogin;
