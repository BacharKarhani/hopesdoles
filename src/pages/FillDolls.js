import React, { useEffect, useState } from "react";
import "./FillDolls.css";
import Pagination from "../components/Pagination";
import Whatsapp from "../components/Whatsapp";
import Loading from "../components/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FillDolls() {
  const [video, setVideo] = useState([]);
  const [lastvideo, setLastVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getvideo();
    getlastvideo();
  }, []);
  let { name } = useParams();
  const getvideo = async () => {
    let res = await axios.get(`https://api.hopesdolls.com/api/video/${name}`, {
      headers: {
        "ngrok-skip-browser-warning": "anyvalue",
      },
    });

    try {
      setVideo(res.data.response);
      setLoading(false);
      console.log(res.data.response);
    } catch (err) {
      console.log(err);
    }
  };
  const getlastvideo = async () => {
    let res = await axios.get(
      `https://api.hopesdolls.com/api/video/last/${name}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      }
    );
    try {
      setLastVideo(res.data.response);
      setLoading(false);
      console.log(res.data.response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      {loading ? (
        <div className="loading_div">
          <Loading />
        </div>
      ) : (
        <div className="Fill_Dolls">
          <h1>How to fill the Doll</h1>
          <div className="FillDolls_first">
            {lastvideo.map((e, index) => {
              return (
                <div key={index}>
                  <iframe
                    width="860"
                    height="415"
                    src={e.path}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              );
            })}
          </div>

          <div className="FillDolls_all_whole">
            <div className="FillDolls_all">
              {video &&
                video.map((e, index) => {
                  return (
                    <div key={index}>
                      <iframe
                        width="430"
                        height="207"
                        src={e.path}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="FillDolls_pagination">
            <Pagination />
          </div>
          <Whatsapp />
        </div>
      )}
      <Footer />
    </>
  );
}
