import React, { useEffect, useState } from "react";
import "./Cards.css";
import { Link } from "react-router-dom";
import DollById from "../pages/DollById";

export default function Cards(props) {
  const { name, price, image, _id, priceOutside } = props.doll;
  const { inLebanon } = props; // Get inLebanon from props

  return (
    <div className="cards">
      <img
        src={`https://api.hopesdolls.com/images/${image[0]}`}
        alt=""
        loading="lazy"
      />
      <div className="AddToCart">
        <div className="opacity">
          <Link to={`/product/${_id}`}>
            <button>View more</button>
          </Link>
        </div>
      </div>
      <label>
        <p>{name}</p>
        <p>{inLebanon ? price : priceOutside}$</p>
      </label>
    </div>
  );
}
