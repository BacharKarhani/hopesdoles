import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../../Store";
import Header from "../../components/Header";
import "./cart.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Footer from "../../components/Footer";

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(
      `https://api.hopesdolls.com/api/products/${item._id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      }
    );
    if (data.quantity < quantity) {
      alert(`This Item has only ${quantity - 1} available items in our stock`);
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const checkoutHandler = () => {
    const user = localStorage.getItem("user");
    if (user) {
      // Assuming user is stored as a JSON string, we parse it
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        navigate("/checkout");
      }
    } else {
      navigate("/login?redirect=/checkout");
    }
  };

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const [lb, setLb] = useState(false);
  const [inLebanon, setInLebanon] = useState(false);

  useEffect(() => {
    // localStorage.getItem("lbc") ? setLb(true) : setLb(false);
    localStorage.getItem("inLebanon") === "true"
      ? setInLebanon(true)
      : setInLebanon(false);
  }, [localStorage]);

  const {
    cart: { cartItems },
  } = state;

  const deliveryPrice = cartItems.length > 0 ? (inLebanon ? 3 : 8) : 0; // Only add delivery price if cart is not empty

  const subtotal = lb
    ? cartItems.reduce((a, c) => a + c.priceOutside * c.quantity, 0)
    : cartItems.reduce(
        (a, c) => a + (inLebanon ? c.price : c.priceOutside) * c.quantity,
        0
      );

  const total = subtotal + deliveryPrice; // Add delivery price to total

  return (
    <>
      <Header />
      <div className="row cart-container">
        <div className="col">
          {cartItems.length === 0 ? (
            <bold>Cart is empty</bold>
          ) : (
            <ul className="list-group">
              {cartItems.map((item) => (
                <li key={item._id} className="list-group-item">
                  <div className="row cart-main">
                    <div className="col-md-4">
                      <img
                        src={`https://api.hopesdolls.com/images/${item.image}`}
                        alt={item.name}
                        className="img-fluid"
                      />{" "}
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </div>
                    <div className="col-md-3 btns">
                      <button
                        className="cart-btn"
                        disabled={item.quantity === 1}
                        onClick={() => {
                          updateCartHandler(item, item.quantity - 1);
                        }}
                      >
                        <RemoveOutlinedIcon />
                      </button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <button
                        onClick={() => {
                          updateCartHandler(item, item.quantity + 1);
                        }}
                        className="cart-btn"
                        disabled={item.quantity === item.countInStock}
                      >
                        <AddCircleOutlinedIcon />
                      </button>{" "}
                    </div>
                    <div className="col-md-3">
                      {inLebanon
                        ? item.price
                        : lb
                        ? item.priceOutside
                        : item.priceOutside}
                    </div>
                    <div className="col-md-2">
                      <button
                        className="cart-btn"
                        onClick={() => removeItemHandler(item)}
                      >
                        <DeleteOutlineIcon sx={{ color: "red" }} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="ps">
          <div className="card">
            <div className="card-body">
              <ul className="list-group" variant="flush">
                <li className="list-group-item">
                  <h4>
                    Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {lb
                      ? cartItems.reduce(
                          (a, c) => a + c.priceOutside * c.quantity,
                          0
                        )
                      : cartItems.reduce(
                          (a, c) =>
                            a +
                            (inLebanon ? c.price : c.priceOutside) * c.quantity,
                          0
                        )}
                  </h4>
                </li>
                {cartItems.length > 0 && (
                  <li className="list-group-item">
                    <h4>Delivery: ${deliveryPrice}</h4>
                  </li>
                )}
                <li className="list-group-item">
                  <h4>Total: ${total}</h4>
                </li>
                <li className="list-group-item">
                  <div className="d-grid">
                    <button
                      disabled={cartItems.length === 0 ? true : false}
                      className="disable"
                      onClick={checkoutHandler}
                    >
                      Process to Checkout
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Cart;
