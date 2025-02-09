import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "./createCoupon.css";
import { useNavigate } from "react-router-dom";

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
        .post("https://api.hopesdolls.com/api/coupon/create", data, {
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
