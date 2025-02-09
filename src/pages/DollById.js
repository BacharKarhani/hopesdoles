import React, { useContext, useEffect, useState } from "react";
import "./DollById.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Store } from "../Store";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
export default function DollByID() {
  toast.configure();
  let { id } = useParams();
  const [count, setCounter] = useState(1);
  const [doll, setDolls] = useState({});
  const { state, dispatch } = useContext(Store);
  const [user, setUser] = useState(false);
  const exist = localStorage.getItem("user");
  const [lb, setLb] = useState(false);

  useEffect(() => {
    const inLebanon = localStorage.getItem("inLebanon");
    // console.log("inLebanon:", inLebanon);
    setLb(inLebanon === "true");
  }, []);

  useEffect(() => {
    if (exist !== null) {
      setUser(true);
    }
  }, [exist]);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === doll._id);
    const quantity =
      existItem && doll.quantity === count ? existItem.quantity + 1 : count;
    const { data } = await axios.get(
      `https://api.hopesdolls.com/api/products/${item._id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      }
    );
    if (data.countInStock < quantity) {
      alert(`This Item has only ${quantity - 1} available items in our stock`);
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity: count },
    });
    toast.success("Added to cart Successfully");
  };
  useEffect(() => {
    axios
      .get(`https://api.hopesdolls.com/api/products/${id}`, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log("response ", res.data);
        setDolls(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleAdd = () => {
    if (count === doll.quantity) {
      alert(`Only ${count} Of this Item are available`);
      return;
    }
    setCounter(count + 1);
  };
  const handleMinus = () => {
    setCounter(count - 1);
    if (count === 1) {
      setCounter(1);
      alert("you can't decrease the counter anymore");
    }
  };

  const navigate = useNavigate();

  const buy = () => {
    if (!user) {
      navigate("/login?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      <Header />
      <div key="index" className="container-show-doll">
        <div className="one-show-doll-first-step">
          <h1 className="one-show-doll-dolls-title">
            {doll && doll.category ? doll.category.name : "Product"}{" "}
          </h1>
        </div>
        <div className="one-show-doll-res-content-under-img">
          <div className="one-show-doll-logo-imgs">
            <div className="imagesection">
              <img
                src={`https://api.hopesdolls.com/images/${doll.image}`}
                alt="hopes"
              ></img>
            </div>
            <div className="one-show-doll-photo-detail">
              <h1>{doll.name}</h1>
              <div className="one-show-doll-pap">
                <p id="one-show-doll-price">
                  PRICE: {lb ? doll.price : doll.priceOutside}
                </p>
                <p id="one-show-doll-dollar-num">$</p>
              </div>
              <div className="one-show-doll-content">
                <div className="one-show-doll-pac-size-cloth">
                  <div className="one-show-doll-package">
                    <h4>PACKAGE:</h4>
                    <ul className="one-show-doll-dashed">
                      <li>{doll.package}</li>
                    </ul>
                  </div>
                  <div className="one-show-doll-size">
                    <h4>SIZE:</h4>
                    <ul className="one-show-doll-dashed">
                      <li>{doll.size}</li>
                    </ul>
                  </div>
                  <div className="one-show-doll-clothes">
                    <h4>CLOTHES:</h4>
                    <ul className="one-show-doll-dashed-clothes">
                      <li>{doll.clothes}</li>
                    </ul>
                  </div>
                </div>
                <div className="one-show-doll-qunt-price">
                  <div className="one-show-doll-quantity">
                    <h4>QUANTITY</h4>
                    <div className="one-show-doll-count-quant">
                      <button
                        className="one-show-doll-minus-button"
                        onClick={handleMinus}
                      >
                        -
                      </button>
                      <div className="one-show-doll-numb">{count}</div>
                      <button
                        className="one-show-doll-plus-button"
                        onClick={handleAdd}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="one-show-doll-add-to-cart-btn"
                      onClick={() => addToCartHandler(doll)}
                    >
                      Add To cart
                    </button>
                  </div>
                  <div className="one-show-doll-price-sec">
                    <div>
                      <h4 id="one-show-doll-total-price">TOTAL PRICE</h4>
                      <p id="one-show-doll-tot-price">
                        ${lb ? doll.price * count : doll.priceOutside * count}
                      </p>
                    </div>
                    <div>
                      <Link to="/checkout">
                        <button
                          className="one-show-doll-buy-now-btn"
                          onClick={buy}
                          style={{ cursor: "pointer" }}
                        >
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
