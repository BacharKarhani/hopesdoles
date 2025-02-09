import React from "react";
import { Link } from "react-router-dom";
import Dolls from "../images/hopes-dolls-store.png";
import "../components/Footer.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SiWhatsapp } from "react-icons/si";
import { AiOutlineArrowUp } from "react-icons/ai";
function Footer({ handlesChange, handlesSubmit, subscribe }) {
  const currentYear = new Date().getFullYear();
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <section className="newsletter-section">
        <h3>Our Newsletter</h3>
        <p>Do you want to stay in touch with our activities?</p>
        <div className="newsletter-form-section">
          <h4>Join Our Newsletter</h4>
          <form
            id="newsletter_subscription"
            onSubmit={handlesSubmit}
            className="newsletter-form"
          >
            <label>
              <span>Email Address*</span>
              <input
                className="newsletter-email"
                onChange={handlesChange}
                name="email"
                value={subscribe}
                placeholder="Please Enter Your Email"
                type="email"
                required
              />
            </label>
            <button className="newsletter-btn">Submit</button>
          </form>
        </div>
      </section>

      <footer>
        <div className="btn-top">
          <button onClick={() => scrollTop()} className="btn-top-arrow">
            <AiOutlineArrowUp />
          </button>
        </div>
        <div className="footer">
          <img src={Dolls} alt="Doll_Logo" />

          <div className="footer_content">
            <div className="left_content">
              <h2>Quick Links</h2>
              <div className="footer_subContent">
                <Link className="footer_links grow left" to="/">
                  Home
                </Link>
                <Link className="footer_links grow" to="/dolls">
                  Dolls
                </Link>
                <Link
                  className="footer_links grow left"
                  to="/facts/PsychologicalFacts"
                >
                  Psychological Facts
                </Link>
                <Link className="footer_links grow" to="/story">
                  Story
                </Link>
                <Link className="footer_links grow left" to="/hoops">
                  Hoops
                </Link>
                <Link className="footer_links grow" to="/filldoll/FillDolls">
                  Podcast
                </Link>
              </div>
            </div>

            <div className="right_content">
              <h2>Follow Us</h2>
              <div className="footer_subContent">
                <div className="insta_link">
                  <FaInstagram className="insta" />
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer_socials grow"
                  >
                    hopes.dolls.store
                  </a>
                </div>
                <div className="mail_link">
                  <HiOutlineMail className="mail" />
                  <a
                    href="https://www.instagram.com/accounts/login/?next=/hopes.dolls.store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer_socials grow"
                  >
                    hopesdollsstore@gmail.com
                  </a>
                </div>
                <div className="facebook_link">
                  <FaFacebookF className="facebook" />
                  <a
                    href="https://www.facebook.com/Hopes-Dolls-Store-273581593273162"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer_socials grow"
                  >
                    Hopes Dolls Store
                  </a>
                </div>
                <div className="whatsapp_link">
                  <SiWhatsapp className="whatsapp" />
                  <a
                    href="https://wa.me/96170297540"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer_socials grow"
                  >
                    0096106693437
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          {/* <p>Made with &hearts;</p> */}
          <p>
            @Copyright Hopes {currentYear}-Created By{" "}
            <a href="https://www.linkedin.com/in/omair-khoder">
              <b>Omair</b>
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
