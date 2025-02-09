import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AddCollection.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCollection() {
  toast.configure();
  const [category, setCategory] = useState([]);
  const [state, setState] = useState({
    name: "",
    category_id: "",
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
      category_id: state.category_id,
    };
    axios
      .post(`https://api.hopesdolls.com/api/collections`, data, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log(res.data);
        setState({
          name: "",
          category_id: "",
        });
        toast.success("Collection Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Adding Collection");
      });
  };
  useEffect(() => {
    axios
      .get(`https://api.hopesdolls.com/api/categories`, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        setCategory(res.data);
      });
  }, []);

  return (
    <>
      <div className="collection_data">
        <h2>Add New Collection</h2>
        <form className="dashboard_collection_form" onSubmit={handleSubmit}>
          <input
            type={"text"}
            id="name"
            name="name"
            placeholder="Enter Collection Name"
            onChange={handleChange}
            value={state.name}
          />

          <label>Select Category</label>
          <select
            className="select_category"
            name="category_id"
            onChange={handleChange}
            value={state.category_id}
          >
            <option>Select Category</option>
            {category.map((item) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCollection;
