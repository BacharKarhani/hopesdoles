import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AddVideo.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddVideo() {
  toast.configure();

  const [state, setState] = useState({
    path: "",
    page: "",
  });
  const handleChange = (e) => {
    e.persist();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      path: state.path,
      page: state.page,
    };
    axios
      .post(`https://api.hopesdolls.com/api/video`, data, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log(res.data.response);
        setState({
          path: "",
          page: "",
        });
        toast.success("Video Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Adding Video");
      });
  };

  return (
    <>
      <div className="video_data">
        <h2>Add New Video</h2>
        <form className="dashboard_video_form" onSubmit={handleSubmit}>
          <input
            type={"text"}
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
    </>
  );
}

export default AddVideo;
