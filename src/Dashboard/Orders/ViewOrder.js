import { Button, FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./ViewOrder.css";
import URLs from "../../config/urls";

function ViewOrder() {
  const { id } = useParams();
  const [order, setOrders] = useState(null);  // Use null instead of an empty array
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getData();
  }, [id]);

  const fnStatus = useCallback(() => {}, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        URLs.UPDATE_ORDER_STATUS(id),
        { status_id: status },
        {
          headers: { "ngrok-skip-browser-warning": "anyvalue" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("Failed to update status");
        console.log(err);
      });
  };

  const getData = async () => {
    try {
      setLoading(true);
      if (id) {
        let res = await axios.get(URLs.GET_ORDER(id), {
          headers: { "ngrok-skip-browser-warning": "anyvalue" },
        });
        setOrders(res.data);  // Set the order data
        setStatus(res.data.status_id._id);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching order data:", err);
    }
  };

  useEffect(() => {
    getStatus();
  }, [status]);

  const getStatus = async () => {
    try {
      let res = await axios.get(URLs.GET_ORDER_STATUSES, {
        headers: { "ngrok-skip-browser-warning": "anyvalue" },
      });
      setStatuses(res.data.response);
    } catch (err) {
      console.error("Error fetching statuses:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // Show loading message until data is fetched
  }

  return (
    <div className="order-data">
      <h2 className="order-data-heading">Order Details</h2>
      {order ? (  // Check if order data exists
        <>
          <div className="client-order-details">
            <p className="data">Client Name: {order.user_info?.name}</p>
            <p className="data">Client Email: {order.user_info?.email}</p>
            <p className="data">Client Number: {order.user_info?.phone}</p>
            <p className="data">Client Address: {order.user_info?.address?.street}, {order.user_info?.address?.city}, {order.user_info?.address?.state}, {order.user_info?.address?.zip}, {order.user_info?.address?.country}</p>
            <p className="data">Payment Type: {order.payment_type}</p>
            <p className="data">Total Price: {order.totalPrice} $</p>
            <p className="data">Order Request Time: {new Date(order.createdAt).toLocaleString()}</p>
            {/* <p className="data">Updated At: {new Date(order.updatedAt).toLocaleString()}</p> */}
          </div>
          
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, maxWidth: 300 }}>
              <Select
                onChange={(e) => {
                  setStatus(e.target.value);
                  fnStatus();
                }}
                value={status}
                sx={{ width: 250 }}
              >
                {statuses.map((status, key) => (
                  <MenuItem value={status._id} key={key}>
                    {status.type}
                  </MenuItem>
                ))}
              </Select>
              <button type="submit">Edit Status</button>
            </FormControl>
          </form>
          
          {order.product_id.map((each, key) => {
            return (
              <div key={key}>
                <h2 className="product_title">Product {key + 1}</h2>
                <div className="product_details">
                  <p className="data">Product Name: {each.name}</p>
                  {/* <p className="data">Product Price: {each.price}</p>
                  <p className="data">Is Best Seller: {each.is_best_seller ? 'Yes' : 'No'}</p> */}
                  {/* Add other product details as needed */}
                </div>
                <div className="product_details_images">
                  {each.image && each.image.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={`https://api.hopesdolls.com/images/${img}`}
                      alt={`product-image-${imgIndex}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>No order details found</div>
      )}
    </div>
  );
}

export default ViewOrder;
