import axios from "axios";
import React, { useState, useEffect } from "react";
import "./AddCategory.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../../components/Loader.js";
import URLs from "../../config/urls.js";
function EditCategory() {
  toast.configure();

  const [state, setState] = useState({
    name: "",
  });

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleCategory(id);
    }
  }, [id]);
  const getSingleCategory = async (id) => {
    try {
      const response = await axios.get(URLs.GET_CATEGORY(id), {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });
  
      console.log(response);
      if (response.status === 200) {
        setState({ ...response.data });
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      toast.error("Error While Fetching Category");
    }
  };
  

  const handleChange = (e) => {
    e.persist();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: state.name,
    };
  
    try {
      const response = await axios.put(URLs.UPDATE_CATEGORY(id), data, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });
  
      console.log(response.data);
      setState({ name: "" });
      toast.success("Category Updated Successfully");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error While Updating Category");
    }
  };
  
  return (
    <>
      <div className="category_data">
        <h2>Edit Category</h2>
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

export default EditCategory;
