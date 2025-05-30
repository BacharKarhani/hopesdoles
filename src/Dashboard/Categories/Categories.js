import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";
import URLs from "../../config/urls";
function Categories() {
  toast.configure();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    await axios
      .get(URLs.CATEGORIES, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        console.log(res);
        setCategory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteCategory = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete Category?")) {
      try {
        const res = await axios.delete(URLs.DELETE_CATEGORY(id), {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        });
  
        console.log(res);
        toast.success("Category Deleted Successfully");
        getCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Error While Deleting Category");
      }
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
      <div className="category_table">
        <Link to="/dashboard/addcategory">
          <button className="add-category-btn">Add Category</button>
        </Link>
        <table className="styled-table-cat">
          <thead>
            <tr>
              <th style={{ textalign: "center" }}>Name</th>
              <th style={{ textalign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {category &&
              category.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      <Link
                        className="edit-btn"
                        to={`/dashboard/editcategory/${item._id}`}
                      >
                        <button className="btn-edit">Edit</button>
                      </Link>
                      <button
                        className="btn-delete"
                        onClick={() => onDeleteCategory(item._id)}
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

export default Categories;
