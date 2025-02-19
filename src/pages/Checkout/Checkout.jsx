import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import "./checkout.css";
import Header from "../../components/Header";
import Address from "../../components/Address";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import URLs from "../../config/urls";

const Checkout = () => {
  const [value, setValue] = useState("1");
  const [err, setError] = useState("");
  const [addr, setAddr] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [country, setCountry] = useState("");
  const [lb, setLb] = useState(false);
  const [ids, setIds] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const { state, dispatch } = useContext(Store);
  const Navigate = useNavigate();
  const { cart: { cartItems } } = state;

  useEffect(() => {
    const uniqueIds = [...new Set(cartItems.map((cart) => cart._id))];
    setIds(uniqueIds);
  }, [cartItems]);

  useEffect(() => {
    const apiKey = "53ef6df42347e9d19d6132a736f0781f";
    const ipstackUrl = `http://api.ipstack.com/check?access_key=${apiKey}`;

    axios
      .get(ipstackUrl)
      .then((response) => {
        const userCountry = response.data.country_name;
        setCountry(userCountry);
        localStorage.setItem("lbc", userCountry === "Lebanon");
        setLb(userCountry === "Lebanon");
      })
      .catch((error) => {
        console.error("Error fetching user's country:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const baseTotalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    // Check local storage for "inLebanon" value
    const isInLebanon = localStorage.getItem("inLebanon") === "true";
    const deliveryFee = isInLebanon ? 3 : 8;
    const finalTotalPrice = baseTotalPrice + deliveryFee;

    setOrderTotal(finalTotalPrice); // احفظ قيمة الطلب الإجمالية

    try {
      await axios.post(URLs.SUBMIT_ORDER(), {
        name: data.name,
        email: 0,
        phone: data.phone,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        },
        product_id: ids,
        payment_type: "cash on delivery",
        quantity: totalQuantity,
        totalPrice: finalTotalPrice,
        status_id: "67ae2d6c96e55b1038217622",
      });

      setShowPopup(true);
      setCountdown(10);

      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setShowPopup(false);
            Navigate("/");
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again or contact us.");
    }
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        {err && <p>{err}</p>}
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Address
            handleSubmit={handleSubmit}
            handleChange={handleInputChange}
            addr={addr}
            lb={lb}
            data={data}
          />
        </Box>
      </div>

      {/* Popup Confirmation */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Order Submitted!</h2><br/>
            <p>Your order has been successfully placed.</p><br/>
            <p>Total Amount:<strong>${orderTotal}</strong> </p><br/>
            <p>Closing in <strong>{countdown}</strong> seconds...</p><br/>
            <button className="close-btn" onClick={() => setShowPopup(false)}>Close Now</button><br/>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
