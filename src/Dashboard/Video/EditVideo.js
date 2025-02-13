import axios from "axios";
import React, { useState, useEffect } from "react";
import "./EditVideo.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import URLs from "../../config/urls";

function EditProduct() {
  toast.configure();
  const [state, setState] = useState({
    path: "",
    page: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleVideo(id);
    }
  }, [id]);

  const getSingleVideo = async (id) => {
    try {
      const response = await axios.get(URLs.GET_VIDEO_BY_ID(id), {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });

      if (response.status === 200) {
        setState({ ...response.data });
      }
    } catch (err) {
      console.error("Error fetching video:", err);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(URLs.UPDATE_VIDEO(id), state, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        toast.success("Video Updated Successfully");
      })
      .catch((err) => {
        console.error("Error updating video:", err);
        toast.error("Error While Updating Video");
      });
  };

  return (
    <div className="editVideo_data">
      <h2>Edit Video</h2>
      <form className="dashboard_editvideo_form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="path"
          name="path"
          onChange={handleChange}
          value={state.path}
        />
        <label>Select page</label>
        <select
          className="select_video"
          name="page"
          id="page"
          onChange={handleChange}
          value={state.page}
        >
          <option>Select page</option>
          <option value="DollsHouse">DollsHouse</option>
          <option value="FillDolls">FillDolls</option>
          <option value="PsychologicalFacts">PsychologicalFacts</option>
        </select>

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
