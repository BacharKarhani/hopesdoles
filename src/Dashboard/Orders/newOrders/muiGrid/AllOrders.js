import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState, useEffect } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PreviewIcon from "@mui/icons-material/Preview";
import URLs from "../../../../config/urls";

const AllOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URLs.GET_ALL_ORDERS, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });
      setData(res.data); // Assuming this is an array of orders
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRejected = (id) => {
    if (window.confirm("Are you sure you want to reject this order?")) {
      axios
        .put(
          URLs.UPDATE_ORDER_STATUS(id),
          { status_id: "67ae2c7496e55b10382175fd" },
          {
            headers: {
              "ngrok-skip-browser-warning": "anyvalue",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          getData(); // Refresh data after rejection
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user_info.name",
      headerName: "Client Name",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return params.row.user_info ? params.row.user_info.name : "-";
      },
    },
    // {
    //   field: "user_info.email",
    //   headerName: "Email",
    //   width: 200,
    //   editable: false,
    //   renderCell: (params) => {
    //     return params.row.user_info ? params.row.user_info.email : "-";
    //   },
    // },
    {
      field: "user_info.phone", // assuming phone is available in user_info
      headerName: "Phone Number",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return params.row.user_info && params.row.user_info.phone
          ? params.row.user_info.phone
          : "-";
      },
    },
    {
      field: "user_info.address.street",
      headerName: "Street Address",
      width: 180,
      editable: false,
      renderCell: (params) => {
        return params.row.user_info && params.row.user_info.address
          ? params.row.user_info.address.street
          : "-";
      },
    },
    {
      field: "user_info.address.city",
      headerName: "City",
      width: 130,
      editable: false,
      renderCell: (params) => {
        return params.row.user_info && params.row.user_info.address
          ? params.row.user_info.address.city
          : "-";
      },
    },
    {
      field: "payment_type",
      headerName: "Payment Type",
      width: 150,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 110,
      editable: false,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 130,
      editable: false,
    },
    {
      field: "status_id.type",
      headerName: "Status",
      width: 130,
      editable: false,
      renderCell: (params) => {
        return params.row.status_id ? params.row.status_id.type : "-";
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
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
            <Link to={"/dashboard/vieworder/" + params.row._id}>
              <PreviewIcon />
            </Link>
            <DeleteOutline
              sx={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                handleRejected(params.row._id);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
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
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </>
  );
};

export default AllOrders;
