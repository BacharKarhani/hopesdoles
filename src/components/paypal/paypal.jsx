import * as PayPal from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import axios from "axios";
const PaypalPayment = (props) => {
  const { state, dispatch } = useContext(Store);
  const [ids, setIds] = useState([]);
  const {
    cart: { cartItems },
  } = state;
  useEffect(() => {
    cartItems.map((cart) => {
      setIds([...ids, cart._id]);
    });
    console.log(ids);
  }, [cartItems]);
  const paypalOptions = {
    clientId:
      "AS6Nsr_3ybmI6t-oCffJZel0wQ5-wZNP-m90GVIwZthtbgk6t1amh4ggGIrjtayXEeeMT1h7-4zQp7g9",
    currency: "USD",
    amount: props.amount * 100,
    application_context: {
      shipping_preference: "NO_SHIPPING",
    },
    style: {
      layout: "vertical",
      color: "gold",
    },
    onSuccess: async (details, data) => {
      console.log("Transaction completed by " + details.payer.name.given_name);
      console.log(data);
      await axios
        .post(`https://localhost:3000/api/orders`, {
          client_id: JSON.parse(localStorage.getItem("user"))._id.toString(),
          product_id: ids,
          payment_type: "PayPal",
          quantity: 1,
          totalPrice: props.amount,
        })
        .then((res) => {
          toast.success("Purchases Successfully");
        })
        .catch((err) => {
          toast.error("An Error Occured While purchasing please Contact us");
        });
    },
    onError: (err) => {
      console.error(err);
    },
  };

  return (
    <>
      <div className="paypal">
        <PayPal.PayPalScriptProvider>
          <PayPal.PayPalButtons {...paypalOptions} fundingSource="paypal" />
        </PayPal.PayPalScriptProvider>
      </div>
    </>
  );
};

export default PaypalPayment;
