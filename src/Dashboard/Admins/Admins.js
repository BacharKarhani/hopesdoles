import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";
import { color } from "@mui/system";

function Admins() {
  toast.configure();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdmins();
  }, []);
  const getAdmins = async () => {
    await axios
      .get("https://api.hopesdolls.com/api/admins", {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        setAdmins(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDeleteAdmin = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete admin?")) {
      await axios
        .delete(`https://api.hopesdolls.com/api/admins/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("Admin Deleted Successfully");
          getAdmins();
        });
    }
  };
  if (loading) {
    return (
      <div className="loading_div">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="admin_table">
        <Link to="/dashboard/addadmin">
          <button className="add-admin_btn">Add Admin</button>
        </Link>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textalign: "center" }}>Name</th>
              <th style={{ textalign: "center" }}>Email</th>
              <th style={{ textalign: "center" }}>Phone</th>
              <th style={{ textalign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins &&
              admins.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <Link
                        className="edit-btn"
                        to={`/dashboard/editadmin/${item._id}`}
                      >
                        <button className="btn-edit">Edit</button>
                      </Link>
                      {localStorage.getItem("id") === item._id ? (
                        <button className="btn-delete" disabled>
                          Delete
                        </button>
                      ) : (
                        <button
                          className="btn-delete"
                          onClick={() => onDeleteAdmin(item._id)}
                        >
                          {" "}
                          Delete{" "}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admins;
// import { DataGrid } from '@mui/x-data-grid';
// import React, { useEffect, useState } from 'react'

// import { MdDelete } from "react-icons/md";
// import { BiEdit } from "react-icons/bi";

// import Dialog from '@mui/material/Dialog';
// import Button from '@mui/material/Button';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogContent from '@mui/material/DialogContent';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';

// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';

// export default function Admin() {
//   toast.configure();
//   const columns = [
//     {
//       field: 'name',
//       headerName: 'name',
//       width: 150,
//       editable: true,
//     },
//     {
//       field: 'email',
//       headerName: 'email',
//       width: 150,
//       editable: true,
//     },
//     {
//       field: 'phone',
//       headerName: 'phone ',
//       width: 220,
//       editable: true,
//     },
//     {
//       field: "action",
//       headerName: "Actions",
//       width: 140,
//       renderCell: (params) => {

//         return (
//           <>
//             <Button onClick={() => {
//               handleClickOpen();
//               setId(params.row.id)
//             }}>

//               <BiEdit style={{ color: "#4CAF50", fontSize: "32px", cursor: "pointer", marginTop: "2px" }} />

//             </Button>

//             <Button onClick={() => {
//               deleteAdmin(params.row.id);

//             }} >

//               <MdDelete style={{ color: "dd0000", fontSize: "27px", cursor: "pointer" }} />

//             </Button>

//           </>
//         );
//       },
//     },
//   ];

//   const [admins, setAdmins] = useState([]);

//   const [open, setOpen] = useState(false);
//   const [id, setId] = useState();

//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const [adminInput, setAdminInput] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: ''
//   });

//   ///                  /////
//   const handleClickOpen = () => {
//     setOpen(!open);
//   };

//   const handleInput = (e) => {
//     setAdminInput({ ...adminInput, [e.target.name]: e.target.value })
//   }
//   const updateAdmin = (e) => {
//     e.preventDefault();

//     // console.log(id);
//     const data = {
//       name: adminInput.name,
//       email: adminInput.email,
//       phone: adminInput.phone,
//       password: adminInput.password,
//     }
//     // console.log(data)

//     axios.put(`https://api.hopesdolls.com/api/admins/${id}`, data).then(res => {
//       if (res.status === 200) {
//         setAdminInput({
//           name: '',
//           email: '',
//           phone: '',
//           password: '',
//         });
//         toast.success("Admin Updated Successfully");
//         // swal("Success!", res.data.message, "success");
//         setOpen(false)
//       }
//     })
//     .catch(err =>{
//       console.log(err);
//     })
//   }

//   const deleteAdmin = async (id) => {

//     try {
//       await axios.delete(`https://api.hopesdolls.com/api/admins/${id}`).then(res => {
//         // swal("Deleted!", res.data.message, "success");
//         const newdata = admins.filter((x) => {
//           return x.id !== id
//         })
//         setAdmins(newdata)
//         toast.success("Admin Deleted Successfully");
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     axios.get('https://api.hopesdolls.com/api/admins').then(res => {
//       //   console.log(res)
//       if (res.status === 200) {
//         setAdmins(res.data.response)
//         // console.log(res.data.admins)
//       }
//     });

//   }, [])

//   useEffect(() => {
//     if (id) {
//       axios.get(`https://api.hopesdolls.com/api/admins/${id}`).then(res => {
//         if (res.status === 200) {
//           setAdminInput(res.data.response)
//           // console.log(res.data.admins)
//         }
//       });
//     }
//   }, [id])

//   return (
//     <>
//     <div className='admin_data' style={{ height: 705, width: 1175 }}>
//       <DataGrid
//         rows={admins}
//         columns={columns}
//         getRowId={(row) => row._id}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//         disableSelectionOnClick
//         sx={{

//           "& .MuiDataGrid-cell:hover": {
//             color: "blue",
//             cursor: "pointer",
//           },
//           fontSize: 14,
//           "& div[data-rowIndex]:nth-of-type(2n+1)": {
//             background: 'white',
//           },
//         }}
//       />
//       <form onSubmit={updateAdmin}>
//         <Dialog
//           fullScreen={fullScreen}
//           open={open}
//           aria-labelledby="responsive-dialog-title"
//         >

//           <DialogContent>
//             <DialogContentText>
//               <div className='card' style={{ width: 450 }} >
//                 <div className='card-header'>
//                   <h4> Edit Admin #{id}
//                   </h4>
//                 </div>
//                 <div className='card-body'>
//                   <div  >
//                     <div className='form-group mb-3'>
//                       <label>Name</label>
//                       <input type="text" name="name" onChange={handleInput} value={adminInput.name} className='form-control' required />
//                     </div>

//                     <div className='form-group mb-3'>
//                       <label>Email</label>
//                       <input type="email" name="email" onChange={handleInput} value={adminInput.email} className='form-control' required />
//                     </div>

//                     <div className='form-group mb-3'>
//                       <label>Phone</label>
//                       <input type="tel" name="phone" onChange={handleInput} value={adminInput.phone} className='form-control' required />
//                     </div>

//                     <div className='form-group mb-3'>
//                       <label>Password</label>
//                       <input type="text" name="password" onChange={handleInput} value={adminInput.password} className='form-control' required />
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button style={{ fontSize: "16px", cursor: "pointer", color: "red" }} autoFocus onClick={handleClickOpen} type="button">
//               Disagree
//             </Button>
//             <Button style={{ fontSize: "16px", cursor: "pointer", color: "green" }} type='submit' onClick={updateAdmin} >
//               Edit Admin
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </form>
//     </div>
//     </>
//   );
// }
