import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Collection.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";

function Collection() {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollections();
  }, []);
  const getCollections = async () => {
    await axios
      .get(`https://api.hopesdolls.com/api/collections`, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log(res);
        setCollection(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDeleteCollection = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete Collection?")) {
      await axios
        .delete(`https://api.hopesdolls.com/api/collections/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("Collection Deleted Successfully");
          getCollections();
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
      <div className="collection_table">
        <Link to="/dashboard/addcollection">
          <button className="add-collection-btn">Add Collection</button>
        </Link>
        <table className="styled-table-coll">
          <thead>
            <tr>
              <th style={{ textalign: "center" }}>Name</th>
              <th style={{ textalign: "center" }}>Category</th>
              <th style={{ textalign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.category_id.name}</td>
                  <td>
                    <Link
                      className="edit-btn"
                      to={`/dashboard/editcollection/${item._id}`}
                    >
                      <button className="btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => onDeleteCollection(item._id)}
                    >
                      Delete
                    </button>
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

export default Collection;
