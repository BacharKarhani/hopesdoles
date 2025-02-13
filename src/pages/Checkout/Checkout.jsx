import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import "./checkout.css";
import Header from "../../components/Header";
import Address from "../../components/Address";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import URLs from "../../config/urls";

const Checkout = () => {
  const [value, setValue] = useState("1");
  const [err, setError] = useState("");
  const [addr, setAddr] = useState(false);
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
        if (userCountry === "Lebanon") {
          localStorage.setItem("lbc", true);
          setLb(true);
        } else {
          localStorage.setItem("lbc", false);
          setLb(false);
        }
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
  
    try {
      await axios.post(URLs.SUBMIT_ORDER(), {
        name: data.name,
        email: data.email,
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
        totalPrice: finalTotalPrice, // Including delivery fee
        status_id : "67ae2d6c96e55b1038217622",
      });
  
      toast.success("Your order has been placed successfully!");
      Navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again or contact us.");
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
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="submit-btn"
            >
              Submit Order
            </button>
          </form>
        </Box>
      </div>
    </>
  );
};

export default Checkout;
