import axios from "axios";
import React, { useState, useEffect } from "react";
import "./AddCategory.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../../components/Loader.js";
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
    const response = await axios.get(
      `https://api.hopesdolls.com/api/categories/${id}`,
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
      .put(`https://api.hopesdolls.com/api/categories/${id}`, data, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log(res.data);
        setState({
          name: "",
        });
        toast.success("Category Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Updating Category");
      });
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
