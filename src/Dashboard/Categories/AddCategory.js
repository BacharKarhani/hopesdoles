import axios from "axios";
import React, { useState } from "react";
import "./AddCategory.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory() {
  toast.configure();

  const [state, setState] = useState({
    name: "",
  });
  const handleChange = (e) => {
    e.persist();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: state.name,
    };
    axios
      .post(`https://api.hopesdolls.com/api/categories`, data, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log(res.data);
        setState({
          name: "",
        });
        toast.success("Category Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Adding Category");
      });
  };
  return (
    <>
      <div className="category_data">
        <h2>Add New Category</h2>
        <form className="category_form" onSubmit={handleSubmit}>
          <input
            type={"text"}
            id="name"
            name="name"
            placeholder="Enter Category Name"
            onChange={handleChange}
            value={state.name}
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCategory;
