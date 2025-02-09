import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddAdmin.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
  const getSingleAdmin = async (id) => {
    const response = await axios.get(
      `https://api.hopesdolls.com/api/admins/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      }
    );
    console.log(response);

    if (response.status === 200) {
      setState({ ...response.data });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: state.name,
      email: state.email,
      password: state.password,
      phone: state.phone,
    };
    axios
      .put(`https://api.hopesdolls.com/api/admins/${id}`, data, {
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
        toast.success("Admin Updated Successfully");
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
        <h2>Edit Admin</h2>
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

export default EditAdmin;
