import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState, useEffect } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PreviewIcon from "@mui/icons-material/Preview";
import URLs from "../../../../config/urls";

const Pending = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URLs.GET_PENDING_ORDERS, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });
  
      // Assuming you have access to status types in a separate API or it's stored in the `response`
      const statusTypes = [
        {
          _id: "67ae2c7496e55b10382175fd",
          type: "Rejected",
        },
        {
          _id: "67ae2d5e96e55b103821761a",
          type: "Accepted",
        },
        {
          _id: "67ae2d6c96e55b1038217622",
          type: "Pending",
        },
      ];
  
      // Mapping the status to each order based on status_id
      const updatedData = res.data.response.map(order => {
        const status = statusTypes.find(status => status._id === order.status_id);
        return { ...order, status_id: status };
      });
  
      setData(updatedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleRejected = (id) => {
    if (window.confirm("Are you sure you want to reject this order")) {
      axios
        .put(
          URLs.REJECT_ORDER(id),
          {
            status_id: "67ae2c7496e55b10382175fd",
          },
          {
            headers: {
              "ngrok-skip-browser-warning": "anyvalue",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err);
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
      field: "status_id",
      headerName: "Status",
      width: 130,
      editable: false,
      renderCell: (params) => {
        return params.row.status_id.type ? params.row.status_id.type : "-";
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
          rows={data}
          loading={loading}
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

export default Pending;
