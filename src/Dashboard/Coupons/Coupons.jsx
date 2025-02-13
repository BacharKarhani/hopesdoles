import { useState, useEffect } from "react";
import "./coupons.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import ManageHistorySharpIcon from "@mui/icons-material/ManageHistorySharp";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import URLs from "../../config/urls";

const Coupons = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URLs.COUPONS, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onDeleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      axios
        .delete(URLs.DELETE_COUPON(id), {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        })
        .then(() => {
          toast.success("Coupon deleted successfully");
          getData();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to delete coupon");
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Coupon Title",
      width: 120,
    },
    {
      field: "client_id",
      headerName: "Client Name",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Coupon Amount (%)",
      width: 200,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to={`/dashboard/viewcoupon/${params.row._id}`}>
            <ManageHistorySharpIcon />
          </Link>
          <DeleteOutline
            sx={{ color: "red", cursor: "pointer" }}
            onClick={() => onDeleteOrder(params.row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Typography>
        <Link to="add" style={{ textDecoration: "none" }}>
          Add Coupon
        </Link>
      </Typography>

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          loading={loading}
          rows={data}
          rowHeight={70}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Coupons;
