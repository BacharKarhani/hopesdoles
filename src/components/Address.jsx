import { useState, useEffect, useContext } from "react";
import "./address.css";
import axios from "axios";
import { toast } from "react-toastify";
import PaypalPayment from "./paypal/paypal";
import { Store } from "../Store";

const Address = ({ handleSubmit, handleChange, lb }) => {
  const { state, dispatch } = useContext(Store);
  toast.configure();
  let [id, setId] = useState("");
  console.log(id);
  const [address, setAddress] = useState({});
  useEffect(() => {
    const user = localStorage.getItem("user");
    const JSONUser = JSON.parse(user);
    setId(JSONUser._id);
  }, [id]);
  const {
    cart: { cartItems },
  } = state;

  const getAddress = async () => {
    try {
      let res = await axios.get(
        `https://api.hopesdolls.com/api/users/getUser/${
          JSON.parse(localStorage.getItem("user"))._id
        }`,
        {
          headers: {
            "ngrok-skip-browser-warning": "Asdasd",
          },
        }
      );
      setAddress(res.data?.address);
      if (
        res.data.address?.region &&
        res.data.address?.city &&
        res.data.address?.district &&
        res.data.address?.building &&
        res.data.address?.street &&
        res.data.address?.floor
      ) {
        localStorage.setItem("addr", JSON.stringify(res.data.address));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAddress();
    return;
  }, [id]);

  return (
    <>
      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Address</h3>
        <div>
          <input
            placeholder="Region"
            type="text"
            onChange={handleChange}
            name="region"
            defaultValue={address ? address.region : ""}
            required={true}
          />
        </div>
        <div>
          <input
            required={true}
            placeholder="City"
            type="text"
            onChange={handleChange}
            name="district"
            defaultValue={address ? address.district : ""}
          />
        </div>
        <div>
          <input
            placeholder="Area"
            type="text"
            onChange={handleChange}
            defaultValue={address ? address.city : ""}
            name="city"
            required={true}
          />
        </div>
        <div>
          <input
            placeholder="Street"
            type="text"
            onChange={handleChange}
            name="street"
            defaultValue={address ? address.street : ""}
          />
        </div>
        <div>
          <input
            placeholder="Building"
            type="text"
            onChange={handleChange}
            name="building"
            defaultValue={address ? address.building : ""}
            required={true}
          />
        </div>
        <div>
          <input
            placeholder="Floor"
            type="number"
            onChange={handleChange}
            name="floor"
            defaultValue={address ? address.floor : ""}
            required={true}
            min="0"
          />
        </div>
        <div>
          {!lb ? (
            <PaypalPayment
              amount={
                lb
                  ? cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
                  : cartItems.reduce(
                      (a, c) => a + c.priceOutside * c.quantity,
                      0
                    )
              }
            />
          ) : (
            <button>Proceed to Checkout</button>
          )}
        </div>
      </form>
    </>
  );
};
export default Address;
