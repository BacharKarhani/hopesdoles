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

const Coupons = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    let res;
    try {
      setLoading(true);
      res = await axios.get("https://api.hopesdolls.com/api/coupon", {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete Coupon?")) {
      axios
        .delete(`https://api.hopesdolls.com/api/coupon/delete/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("Coupons Deleted Successfully");
          getData();
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
      editable: false,
    },
    {
      field: "client_id",
      headerName: "Client name",
      width: 150,
      editable: false,
    },
    {
      field: "amount",
      headerName: "Coupon Amount in %",
      width: 200,
      editable: false,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to={"/dashboard/viewcoupon/" + params.row._id}>
              <ManageHistorySharpIcon />
            </Link>
            <DeleteOutline
              sx={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                onDeleteOrder(params.row._id);
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="table-container">
      {/* <DataGrid /> */}

      <Typography>
        <Link to="add" style={{ textDecoration: "none" }}>
          Add Coupons
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
          disableSelectionOnClick={true}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
};

export default Coupons;
