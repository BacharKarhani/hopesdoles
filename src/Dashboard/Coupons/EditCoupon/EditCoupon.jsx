import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import URLs from "../../../config/urls";

const EditeCoupon = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[3];

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
      if (window.confirm("are you sure you want to edit this coupon?")) {
        axios
          .put(URLs.EDIT_COUPON(id), data, {
            headers: {
              "ngrok-skip-browser-warning": "anyvalue",
            },
          })
          .then((res) => {
            navigate("/dashboard/coupons");
            toast.success(res.data.msg);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    let res;
    try {
      res = await axios.get(URLs.GET_COUPON(id), {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });
      setCoupon(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="create-container">
      <h3>Edit Coupon</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Coupon Title"
          name="title"
          type="text"
          onChange={handleChange}
          defaultValue={coupon.title}
        />
        <input
          placeholder="Discount Amount in %"
          name="amount"
          type="number"
          onChange={handleChange}
          defaultValue={coupon.amount}
        />
        <button>Edit</button>
      </form>
    </div>
  );
};

export default EditeCoupon;
