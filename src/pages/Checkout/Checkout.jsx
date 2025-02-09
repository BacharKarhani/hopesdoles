import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import "./checkout.css";
import Header from "../../components/Header";
import Address from "../../components/Address";
import axios from "axios";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
  const [value, setValue] = useState("1");
  const [err, setError] = useState("");
  const [addr, setAddr] = useState(false); 
  const [data, setData] = useState({
    region: "",
    city: "",
    district: "",
    street: "",
    building: "",
    floor: "",
  });
  const [country, setCountry] = useState("");
  const [lb, setLb] = useState(false);
  const { state, dispatch } = useContext(Store);
  const [ids, setIds] = useState([]);

  const { cart: { cartItems } } = state;

  const Navigate = useNavigate();

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

  const checkAddr = () => {
    const addr = localStorage.getItem("addr");
    if (addr) {
      setAddr(true);
      setData(JSON.parse(addr));
    }
  };

  useEffect(() => {
    checkAddr();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (Object.values(data).some((field) => field.trim() === "")) {
    //   setError("All fields are required");
    //   return;
    // }

    // if (country.toLowerCase() !== data.region.toLowerCase()) {
    //   toast.error("Your region location is different from the region you chose");
    //   return;
    // }

      try {
        const user = JSON.parse(localStorage.getItem("user"));

        // Update user address
        await axios.put(
          `https://api.hopesdolls.com/api/users/${user._id}`,
          {
            address: {
              region: data.region,
              city: data.city,
              district: data.district,
              street: data.street,
              building: data.building,
              floor: data.floor,
            },
          },
          {
            headers: {
              "ngrok-skip-browser-warning": "anyvalue",
            },
          }
        );

        // Submit order
        await axios.post(
          "https://api.hopesdolls.com/api/orders",
          {
            client_id: user._id.toString(),
            product_id: ids,
            payment_type: "cash on delivery",
            quantity: 1,
            totalPrice: 2, // Replace with actual total
          },
          {
            headers: {
              "ngrok-skip-browser-warning": "anyvalue",
            },
          }
        );

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
