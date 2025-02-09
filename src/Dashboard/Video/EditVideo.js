import axios from "axios";
import React, { useState, useEffect } from "react";
import "./EditVideo.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

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
    const response = await axios.get(
      `https://api.hopesdolls.com/api/video/by/${id}`,
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
      .put(`https://api.hopesdolls.com/api/video/${id}`, data, {
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
        toast.success("Video Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Updating Video");
      });
  };
  return (
    <>
      <div className="editVideo_data">
        <h2>Edit Video</h2>
        <form className="dashboard_editvideo_form" onSubmit={handleSubmit}>
          <input
            type={"text"}
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
    </>
  );
}

export default EditProduct;
