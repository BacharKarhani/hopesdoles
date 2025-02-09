import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Video.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";

function Video() {
  toast.configure();
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideos();
  }, []);
  const getVideos = async () => {
    await axios
      .get(`https://api.hopesdolls.com/api/video`, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log(res);
        setVideo(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDeleteVideo = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete Video?")) {
      await axios
        .delete(`https://api.hopesdolls.com/api/video/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("Video Deleted Successfully");
          getVideos();
        });
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
    <>
      <div className="video_table">
        <Link to="/dashboard/addvideo">
          <button className="add-video-btn">Add Video</button>
        </Link>
        <table className="styled-table-coll">
          <thead>
            <tr>
              <th style={{ textalign: "center" }}>Video</th>
              <th style={{ textalign: "center" }}>Page</th>
              <th style={{ textalign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {video &&
              video.map((item) => {
                return (
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
                      {/* <Link to={"/dashboard/editproduct/" + doll._id}>
                              <button onClick={() => getproductById(doll._id)}>
                                Update
                              </button>
                            </Link> */}
                      <Link
                        className="edit-btn"
                        to={"/dashboard/editvideo/" + item._id}
                      >
                        <button className="btn-edit">Edit</button>
                      </Link>

                      <button
                        className="btn-delete"
                        onClick={() => onDeleteVideo(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Video;
