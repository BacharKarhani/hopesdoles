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

  // Mock cart items for now
  const { cart: { cartItems } } = state;


  useEffect(() => {
    cartItems.forEach((cart) => {
      setIds((prevIds) => [...prevIds, cart._id]);
    });
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
    try {
      // Send address and user data to your server
      await axios.post(URLs.SUBMIT_ORDER(), {
        name: data.name,
        email: data.email,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        },
        product_id: ids,
        payment_type: "cash on delivery",
        quantity: 1,
        totalPrice: cartItems.reduce((a, c) => a + c.price * c.quantity, 0), // Replace with actual total
      });

      toast.success("Your order has been placed successfully!");
      Navigate("/"); // Redirect to home or another page
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
            data={data} // Passing the user data to Address component
          />
          {/* Submit button */}
          <button
            type="button"
            className="submit-btn"
            onClick={handleSubmit}
          >
            Submit Order
          </button>
        </Box>
      </div>
    </>
  );
};

export default Checkout;
