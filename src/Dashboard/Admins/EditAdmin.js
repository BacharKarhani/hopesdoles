import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import URLs from "../../config/urls";
import "./AddAdmin.css";
import "react-toastify/dist/ReactToastify.css";

function EditAdmin() {
  toast.configure();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleAdmin(id);
    }
  }, [id]);

  // Fetch single admin details
  const getSingleAdmin = async (id) => {
    try {
      const response = await axios.get(URLs.DELETE_ADMIN(id), {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });

      if (response.status === 200) {
        setState(response.data);
      }
    } catch (error) {
      console.error("Error fetching admin:", error);
      toast.error("Failed to fetch admin details");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: state.name,
      email: state.email,
      password: state.password,
      phone: state.phone,
    };

    try {
      const res = await axios.put(URLs.DELETE_ADMIN(id), data, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });

      console.log(res.data);
      setState({ name: "", email: "", phone: "", password: "" });
      toast.success("Admin Updated Successfully");
    } catch (error) {
      console.error("Error updating admin:", error);
      toast.error("Error while updating admin");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="admin_data">
      <h2>Edit Admin</h2>
      <form className="admin_form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Admin Name"
          onChange={handleChange}
          value={state.name}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Admin Email"
          onChange={handleChange}
          value={state.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Enter Admin Password"
          onChange={handleChange}
          value={state.password}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
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
  );
}

export default EditAdmin;
