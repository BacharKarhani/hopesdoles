import { useState, useEffect, useContext } from "react";
import "./address.css";
import axios from "axios";
import { toast } from "react-toastify";
import PaypalPayment from "./paypal/paypal";
import { Store } from "../Store";

const Address = ({ handleSubmit, handleChange, lb, data }) => {
  const [address, setAddress] = useState({});
  const [id, setId] = useState("");
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    setId(data.name);
  }, [data]);

  const getAddress = async () => {
    try {
      setAddress(data);
      if (
        data.street &&
        data.city &&
        data.state &&
        data.zip &&
        data.country
      ) {
        localStorage.setItem("addr", JSON.stringify(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAddress();
  }, [data]);

  const isInLebanon = JSON.parse(localStorage.getItem("inLebanon"));
  const cartTotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  return (
    <>
      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Address</h3>
        <div>
          <input
            placeholder="Name"
            type="text"
            name="name"
            onChange={handleChange}
            value={data.name}
            required
          />
        </div>
        {/* <div>
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
          />
        </div> */}
        <div>
          <input
            placeholder="Phone"
            type="text"
            name="phone"
            onChange={handleChange}
            value={data.phone}
            required
          />
        </div>
        <div>
          <input
            placeholder="Street"
            type="text"
            name="street"
            onChange={handleChange}
            value={data.street}
            required
          />
        </div>
        <div>
          <input
            placeholder="City"
            type="text"
            name="city"
            onChange={handleChange}
            value={data.city}
            required
          />
        </div>
        <div>
          <input
            placeholder="State"
            type="text"
            name="state"
            onChange={handleChange}
            value={data.state}
            required
          />
        </div>
        
        {!isInLebanon && (
          <div>
            <input
              placeholder="Zip"
              type="text"
              name="zip"
              onChange={handleChange}
              value={data.zip}
              required
            />
          </div>
        )}

        <div>
          <input
            placeholder="Country"
            type="text"
            name="country"
            onChange={handleChange}
            value={data.country}
            required
          />
        </div>

        <div>
          {isInLebanon ? (
            <button type="submit" className="submit-btn">
              Proceed to Checkout
            </button>
          ) : (
            <PaypalPayment amount={cartTotal} />
          )}
        </div>
      </form>
    </>
  );
};

export default Address;