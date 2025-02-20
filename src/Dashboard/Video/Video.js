import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Video.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";
import URLs from "../../../src/config/urls";

function Video() {
  toast.configure();
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const res = await axios.get(URLs.GET_ALL_VIDEOS, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });
      setVideo(res.data.response);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching videos:", err);
      toast.error("Error loading videos");
      setLoading(false);
    }
  };

  const onDeleteVideo = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await axios.delete(URLs.DELETE_VIDEO(id), {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        });
        toast.success("Video Deleted Successfully");
        getVideos();
      } catch (err) {
        console.error("Error deleting video:", err);
        toast.error("Error deleting video");
      }
    }
  };

  if (loading) {
    return (
      <div className="loading_div">
        <Loading />
      </div>
    );
  }

  return (
    <div className="video_table">
        <Link to="/dashboard/addvideo">
        <button className="add-video-btn">Add Video</button>
      </Link>
      <table className="styled-table-coll">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Video</th>
            <th style={{ textAlign: "center" }}>Page</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {video.map((item) => (
            <tr key={item._id}>
              <td>
                <iframe
                  width="300"
                  height="200"
                  src={item.path}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </td>
              <td>{item.page}</td>
              <td>
                <Link className="edit-btn" to={URLs.EDIT_VIDEO(item._id)}>
                  <button className="btn-edit">Edit</button>
                </Link>
                <button className="btn-delete" onClick={() => onDeleteVideo(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Video;
