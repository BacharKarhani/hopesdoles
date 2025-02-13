import axios from "axios";
import React, { useState, useEffect } from "react";
import "./EditCollection.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import URLs from "../../config/urls";
function EditCollection() {
  toast.configure();
  const [category, setCategory] = useState([]);
  const [state, setState] = useState({
    name: "",
    category_id: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleCollection(id);
    }
    getAllCategories();
  }, [id]);

  const getSingleCollection = async (id) => {
    try {
      const response = await axios.get(URLs.GET_COLLECTION(id), {
        headers: { "ngrok-skip-browser-warning": "anyvalue" },
      });

      if (response.status === 200) {
        setState({ ...response.data });
      }
    } catch (error) {
      console.error("Error fetching collection:", error);
      toast.error("Error fetching collection");
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(URLs.CATEGORIES, {
        headers: { "ngrok-skip-browser-warning": "anyvalue" },
      });
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: state.name,
      category_id: state.category_id,
    };

    try {
      await axios.put(URLs.UPDATE_COLLECTION(id), data, {
        headers: { "ngrok-skip-browser-warning": "anyvalue" },
      });

      setState({ name: "", category_id: "" });
      toast.success("Collection Updated Successfully");
    } catch (error) {
      console.error("Error while updating collection:", error);
      toast.error("Error While Updating Collection");
    }
  };

  return (
    <div className="collection_data">
      <h2>Edit Collection</h2>
      <form className="dashboard_collection_form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={state.name}
          placeholder="Enter Collection Name"
        />
        <label>Select Category</label>
        <select
          className="select_category"
          name="category_id"
          onChange={handleChange}
          value={state.category_id}
        >
          <option>Select Category</option>
          {category.map((item) => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCollection;
