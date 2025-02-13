import axios from "axios";
import React, { useState } from "react";
import "./AddVideo.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import URLs from "../../config/urls";

function AddVideo() {
  toast.configure();

  const [state, setState] = useState({
    path: "",
    page: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      path: state.path,
      page: state.page,
    };

    try {
      await axios.post(URLs.ADD_VIDEO, data, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });

      setState({ path: "", page: "" });
      toast.success("Video Added Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error While Adding Video");
    }
  };

  return (
    <div className="video_data">
      <h2>Add New Video</h2>
      <form className="dashboard_video_form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="path"
          name="path"
          placeholder="Enter Video Link"
          onChange={handleChange}
          value={state.path}
        />

        <label>Select Page</label>
        <select
          className="select_video"
          name="page"
          id="page"
          onChange={handleChange}
          value={state.page}
        >
          <option value="">Select page</option>
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

export default AddVideo;
