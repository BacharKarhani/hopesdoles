import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";

import "./Orders.css";
import NewOrders from "./newOrders/newOrders";

function Orders() {
  toast.configure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   getOrders();
  // }, []);
  // const getOrders = () => {
  //   axios
  //     .get(`https://api.hopesdolls.com/api/orders/all`)
  //     .then((res) => {
  //       //console.log(res.data)
  //       setOrders(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  if (loading) {
    return (
      <div className="loading_div">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="orders_table">
        <NewOrders />
      </div>
    </>
  );
}

export default Orders;
