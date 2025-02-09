import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Doll from "../images/Dolls.png";
import Build from "../images/Build.png";
import Hoops from "../images/Hoops.png";
import Clothes from "../images/Clothes.png";
import FillDoll from "../images/FillDoll.png";
import Facts from "../images/Facts.png";
import Cover from "../images/CoverPhoto.jpg";
import "../pages/Home.css";
import Header from "../components/Header";
import WhatsApp from "../components/Whatsapp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";

function Home() {
  const newsletter = document.getElementById("newsletter_subscription");
  toast.configure();
  const [subscribe, setSubscribers] = useState({
    email: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setSubscribers({ ...subscribe, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const subscribersData = {
      email: subscribe.email,
    };
    axios
      .post(`https://api.hopesdolls.com/api/emails`, subscribersData, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          newsletter.reset();
        }
        toast.success("Thanks for your Subscription");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Subscribing");
      });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <Header />
      <div className="image__container">
        <img src={Cover} alt="logo" className="main__image" />
        <div className="image__content">
          <h3 className="main__title">Ready to fill the doll with</h3>
          <h2 className="sub__title">cotton and love?</h2>
          <Link to="/dolls">
            <button className="main__btn">Shop now</button>
          </Link>
        </div>
      </div>
      {/** Handmade Section */}
      <section className="handmade">
        <div className="handmade_headings">
          <h2>Mom & I are sewing</h2>
          <p>Handmade Dolls</p>
        </div>

        {/* <div className="handmade_paragraphs">
          <p>
            Every Family needs a smart activity to refresh the bonding between
            them! Filling our dolls is the activity you are looking for.All you
            need is to fill the doll together without any sewing tool.In this
            case,your child will believe that he makes the doll by himself
            <br />
          </p>
          <p>
            The "Bonding" activity has various effects on your child's
            personality.to know more about the "filling the doll" activity's
            psycho-effects,please,
            <Link className="click_here" to={"/filldoll/FillDolls"}>
              click here.
            </Link>
          </p>
        </div> */}
        <div className="handmade_paragraphs">
          {/* This is expantion section and this content is added by Omair in order to confirm merge for vercel */}
          <p>
            Every Family needs a smart activity to refresh the bonding between
            them!
            {isExpanded ? (
              <>
                Filling our dolls is the activity you are looking for. All you
                need is to fill the doll together without any sewing tool. In
                this case, your child will believe that he makes the doll by
                himself
              </>
            ) : (
              " "
            )}
            <button className="show-more-btn" onClick={toggleExpanded}>
              {isExpanded ? "Show Less" : "Show More..."}
            </button>
          </p>
          {isExpanded && (
            <p>
              The "Bonding" activity has various effects on your child's
              personality. To know more about the "filling the doll" activity's
              psycho-effects, please,
              <Link className="click_here" to={"/filldoll/FillDolls"}>
                click here.
              </Link>
            </p>
          )}
        </div>
      </section>

      {/********** Best Seller Section  ***********/}
      <div></div>
      <section className="discover">
        <div className="discover_heading">
          <h2>Discover More</h2>
          <p>
            When you fill the doll don't forget{" "}
            <span className="feel_it">to feel it</span>
          </p>
        </div>
        <div className="discover_images">
          <div className="discover_images_data">
            <Link className="links" to="/dolls">
              <img src={Doll} alt="Doll-Logo" />
              <p>Dolls</p>
            </Link>
          </div>
          <div className="discover_images_data">
            <Link className="links" to="/hoops">
              <img src={Hoops} alt="Doll-Logo" />
              <p>Hoops</p>
            </Link>
          </div>
          <div className="discover_images_data">
            <Link className="links" to="/filldoll/FillDolls">
              <img className="clothes_image" src={Clothes} alt="Doll-Logo" />
              <p>Clothes</p>
            </Link>
          </div>
          <div className="discover_images_data">
            <Link className="links" to="/filldoll/FillDolls">
              <img src={FillDoll} alt="Doll-Logo" />
              <p>How to fill the doll</p>
            </Link>
          </div>
          <div className="discover_images_data">
            <Link className="links" to="/facts/PsychologicalFacts">
              <img src={Build} alt="Doll-Logo" />
              <p>How to build the DollHouse</p>
            </Link>
          </div>
          <div className="discover_images_data">
            <Link className="links" to="/facts/PsychologicalFacts">
              <img src={Facts} alt="Doll-Logo" />
              <p>Psychological Facts</p>
            </Link>
          </div>
        </div>
      </section>
      <Footer
        handlesChange={handleChange}
        handlesSubmit={handleSubmit}
        state={subscribe}
      />
      <WhatsApp />
    </div>
  );
}

export default Home;
