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
      setData(res.data.response);
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
            status_id: "639ea279b2742e8ce1894309",
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
      field: "client_id",
      headerName: "Client Name",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return params.row.client_id?.name || "N/A";
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: false,
      renderCell: (params) => {
        return params.row.user_info?.email || "N/A";
      },
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 160,
      editable: false,
      renderCell: (params) => {
        return params.row.user_info?.phone || "N/A";
      },
    },
    {
      field: "payment_type",
      headerName: "Payment Type",
      width: 120,
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
      width: 110,
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
