import React, { useState, useEffect } from "react";
import "./Products.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";
import URLs from "../../config/urls";

export default function Products(props) {
  toast.configure();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [productOne, setProductOne] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getproductsByPagination();
  }, []);

  const getproductsByPagination = async (page_id = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(URLs.GET_PRODUCTS(props.id, page_id), {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });

      if (res.data.status === "fail" || res.status === 404) {
        setProducts([]);
        setLoading(false);
        setTotalPages(0);
        return;
      }

      setProducts(res.data.data);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getproductById = async (t_id) => {
    try {
      const res = await axios.get(URLs.GET_PRODUCT_BY_ID(t_id), {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });
      console.log(res.data.response);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const deleteproductById = async (t_id) => {
    if (window.confirm("Are you sure you want to delete Product?")) {
      try {
        await axios.delete(URLs.DELETE_PRODUCT(t_id), {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        });
        toast.success("Product Deleted Successfully");
        getproductsByPagination();
      } catch (err) {
        console.log(err);
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
      <div className="dashboardProducts">
        <div className="add-product-btn-div">
          <Link to="/dashboard/addProduct">
            <button className="add-product-dash-btn">Add Product</button>
          </Link>
        </div>

        {products.length > 0 ? (
          <main className="main-area">
            <div className="centered">
              <section className="dashboardcards">
                {products &&
                  products.map((doll, index) => {
                    return (
                      <div key={index}>
                        <article className="dashboardcard">
                          <picture className="thumbnail">
                            <img
                              src={`https://api.hopesdolls.com/images/${doll.image}`}
                              alt={doll.name}
                            />
                          </picture>
                          <div className="update">
                            <div className="opacity">
                              <Link to={"/dashboard/editproduct/" + doll._id}>
                                <button
                                  onClick={() => getproductById(doll._id)}
                                >
                                  Update
                                </button>
                              </Link>
                            </div>
                          </div>
                          <div className="delete">
                            <div className="opacity">
                              <button
                                onClick={() => deleteproductById(doll._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          <div className="dashboardcard-content">
                            <h2>{doll.name}</h2>
                            <p>{doll.price}$</p>
                            <p>price outside: {doll.priceOutside}$</p>
                          </div>
                        </article>
                      </div>
                    );
                  })}
              </section>
            </div>
          </main>
        ) : (
          <p>There Are No Products</p>
        )}
        <div>
          <Pagination
            count={totalPages}
            getproductsByPagination={getproductsByPagination}
          />
        </div>
      </div>
    </>
  );
}
