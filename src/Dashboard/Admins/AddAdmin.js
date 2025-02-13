import React, { useState } from "react";
import axios from "axios";
import "./AddAdmin.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import URLs from "../../config/urls";

function AddAdmin() {
  toast.configure();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: state.name,
      email: state.email,
      password: state.password,
      phone: state.phone,
    };
    axios
      .post(URLs.ADMINSIGNUP, data, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log(res.data);
        setState({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("Admin Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Adding Admin");
      });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      <div className="admin_data">
        <h2>Add New Admin</h2>
        <form className="admin_form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type={"text"}
            id="name"
            name="name"
            placeholder="Enter Admin Name"
            onChange={handleChange}
            value={state.name}
          />
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            placeholder="Enter Admin Email"
            onChange={handleChange}
            value={state.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type={"text"}
            id="password"
            name="password"
            placeholder="Enter Admin Password"
            onChange={handleChange}
            value={state.password}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type={"tel"}
            id="phone"
            name="phone"
            placeholder="Enter Admin Phone"
            onChange={handleChange}
            value={state.phone}
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddAdmin;
