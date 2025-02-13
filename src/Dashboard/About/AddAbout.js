import React, { useEffect, useState } from "react";
import "./AddAbout.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import URLs from "../../config/urls";

function AddAbout() {
  toast.configure();
  const [text, setText] = useState({});
  const [image, setImage] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setText({ ...text, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    console.log("handleImage ", e.target.files);
    setImage({ image: e.target.files });
  };

  const getData = async () => {
    await axios
      .get(URLs.ABOUTS, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log(res.data.response);
        setText(res.data.response[0]);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const submitAbout = (e) => {
    e.preventDefault();

    let image_array;
    if (image.image) {
      image_array = Object.values(image.image);
    }

    const formData = new FormData();
    if (image_array) {
      image_array.forEach((file) => {
        formData.append("image", file);
      });
    }
    formData.append("english_paragraph", text?.english_paragraph);
    formData.append("arabic_paragraph", text?.arabic_paragraph);

    axios
      .post(`https://aapii.hopesdolls.compi/abouts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        toast.success("About Added Successfully");
        console.log("res ", res.data);
        setImage({
          image: "",
        });
        setText({
          english_paragraph: "",
          arabic_paragraph: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="add_about_form">
        <h2 className="about_title">Edit About</h2>
        <form
          onSubmit={submitAbout}
          encType="multipart/form-data"
          className="about_form"
        >
          <label htmlFor="arabic">Arabic Paragraph</label>
          <textarea
            type="text"
            id="arabic_paragraph"
            name="arabic_paragraph"
            placeholder="Enter Arabic Paragraph"
            onChange={handleInput}
            value={text?.arabic_paragraph}
          />
          <label htmlFor="english">English Paragraph</label>
          <textarea
            type="text"
            id="english_paragraph"
            name="english_paragraph"
            placeholder="Enter English Paragraph"
            onChange={handleInput}
            value={text?.english_paragraph}
          />
          <label htmlFor="image">Images</label>
          <input
            type="file"
            id="images"
            name="image"
            accept=".png, .jpg, .jpeg"
            placeholder="Enter About Images"
            onChange={handleImage}
            multiple="true"
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddAbout;
