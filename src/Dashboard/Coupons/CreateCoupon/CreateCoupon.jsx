import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./createCoupon.css";
import URLs from "../../../config/urls";

const CreateCoupon = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(URLs.CREATE_COUPON, data, {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        })
        .then((res) => {
          navigate("/dashboard/coupons");
          toast.success(res.data.msg);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-container">
      <h3>Create Coupon</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Coupon Title"
          name="title"
          type="text"
          onChange={handleChange}
        />
        <input
          placeholder="Discount Amount in %"
          name="amount"
          type="number"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateCoupon;
