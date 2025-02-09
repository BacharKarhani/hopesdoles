import axios from "axios";
import React, { useState, useEffect } from "react";
import "./EditCollection.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

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
    getOneCategory();
  }, [id]);
  const getSingleCollection = async (id) => {
    const response = await axios.get(
      `https://api.hopesdolls.com/api/collections/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      }
    );

    if (response.status === 200) {
      setState({ ...response.data });
    }
  };
  const getOneCategory = () => {
    axios
      .get(`https://api.hopesdolls.com/api/categories`, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      category_id: state.category_id,
    };
    axios
      .put(`https://api.hopesdolls.com/api/collections/${id}`, data, {
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
        toast.success("Collection Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Updating Collection");
      });
  };
  return (
    <>
      <div className="collection_data">
        <h2>Edit Collection</h2>
        <form className="dashboard_collection_form" onSubmit={handleSubmit}>
          <input
            type={"text"}
            id="name"
            name="name"
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
                <option value={item} key={item._id}>
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

export default EditCollection;
