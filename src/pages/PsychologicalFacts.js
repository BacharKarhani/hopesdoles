import React, { useEffect, useState } from "react";
import "./PsychologicalFacts.css";
import Pagination from "../components/Pagination";
import Whatsapp from "../components/Whatsapp";
import Loading from "../components/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import URLs from "../config/urls";

export default function PsychologicalFacts() {
  const [video, setVideo] = useState([]);
  const [lastvideo, setLastVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  
  let { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoRes, lastVideoRes] = await Promise.all([
          axios.get(URLs.getVideo(name), {
            headers: { "ngrok-skip-browser-warning": "anyvalue" },
          }),
          axios.get(URLs.getLastVideo(name), {
            headers: { "ngrok-skip-browser-warning": "anyvalue" },
          }),
        ]);

        setVideo(videoRes.data.response);
        setLastVideo(lastVideoRes.data.response);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div>
      <Header />
      {loading ? (
        <div className="loading_div">
          <Loading />
        </div>
      ) : (
        <div className="psychological_Facts">
          <h1>Psychological Facts</h1>

          <div className="psycholodical_first">
            {lastvideo.map((e, index) => (
              <div key={index}>
                <iframe
                  width="860"
                  height="415"
                  src={e.path}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>

          <div className="psycholodical_whole">
            <div className="psycholodical_all">
              {video.map((e, index) => (
                <div key={index}>
                  <iframe
                    width="430"
                    height="207"
                    src={e.path}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </div>

          <div className="psycholodical_pagination">
            <Pagination />
          </div>
          <Whatsapp />
        </div>
      )}
      <Footer />
    </div>
  );
}
