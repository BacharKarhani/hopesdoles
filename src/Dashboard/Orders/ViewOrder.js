import { Button, FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./ViewOrder.css";
import URLs from "../../config/urls";

function ViewOrder() {
  const { id } = useParams();
  const [order, setOrders] = useState([]);
  const [statuses, setStatuses] = useState("");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
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
        setOrders(res.data);
        setProduct(res.data.product_id);
        setStatus(res.data.status_id._id);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  };

  return (
    <>
      <div className="order-data">
        <h2 className="order-data-heading">Order Details</h2>
        {order.length !== 0 ? (
          <>
            <div className="client-order-details">
              <p className="data">Client Name: {order.client_id.name}</p>
              <p className="data">Client Email: {order.client_id.email}</p>
              <p className="data">Client Phone: {order.client_id.phone}</p>
              <p className="data">Client Region: {order.client_id.address?.region}</p>
              <p className="data">Client District: {order.client_id.address?.district}</p>
              <p className="data">Client City: {order.client_id.address?.city}</p>
              <p className="data">Client Street: {order.client_id.address?.street}</p>
              <p className="data">Client Building: {order.client_id.address?.building}</p>
              <p className="data">Client Floor: {order.client_id.address?.floor}</p>
              <p className="data">Currency : {order.currency_id?.rate}</p>
              <p className="data">Total Price: {order.totalPrice}</p>
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
                <>
                  <h2 className="product_title">Product:{key + 1} </h2>
                  <div className="product_details">
                    <p className="data">Product Name : {each.name}</p>
                    <p className="data">Product Category : {each.category}</p>
                    <p className="data">Product Clothes : {each.clothes}</p>
                    <p className="data">Product Package : {each.package}</p>
                    <p className="data">Product Price : {each.price}</p>
                    <p className="data">Product Size : {each.size}</p>
                  </div>
                  <div className="product_details_images">
                    {/* {console.log(each.image)} */}
                    {/* {each.product_id.image.map((singleImage) => {
                      return <img src={singleImage} alt="product_images" />;
                    })} */}
                    {product.map((single) =>
                      single.image.map((img) => {
                        console.log(img);
                        return (
                          <img
                            src={`https://apiapi.hopesdolls.comges/${img}`}
                            alt="product"
                          />
                        );
                      })
                    )}
                  </div>
                </>
              );
            })}
          </>
        ) : (
          "Waiting For Order Details"
        )}
      </div>
    </>
  );
}

export default ViewOrder;
