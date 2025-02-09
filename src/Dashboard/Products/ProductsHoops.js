import React, { useState, useEffect } from "react";
import "./Products.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";

export default function ProductsHoops(props) {
  toast.configure();
  let { id } = useParams();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [productOne, setProductOne] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByPagination();
  }, []);

  const getProductsByPagination = async (page_id = 1) => {
    try {
      const res = await axios.get(
        `https://api.hopesdolls.com/api/products/some/${props.id}?page=${page_id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        }
      );

      if (res.data.status === "fail" || res.status === 404) {
        setProducts([]);
        setTotalPages(0);
        setLoading(false);
        return;
      }

      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  async function getProductById(t_id) {
    try {
      const res = await axios.get(
        `https://api.hopesdolls.com/api/products/${t_id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        }
      );
      setProductOne(res.data.response);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteProductById(t_id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `https://api.hopesdolls.com/api/products/${t_id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "anyvalue",
            },
          }
        );
        toast.success("Product Deleted Successfully");
        getProductsByPagination();
      } catch (err) {
        console.error(err);
      }
    }
  }

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
                {products.map((doll, index) => (
                  <div key={index}>
                    <article className="dashboardcard">
                      <picture className="thumbnail">
                        <img
                          src={`https://api.hopesdolls.com/images/${doll.image[0]}`}
                          alt=""
                          loading="lazy"
                        />
                      </picture>

                      <div className="update">
                        <div className="opacity">
                          <Link to={"/dashboard/editproduct/" + doll._id}>
                            <button onClick={() => getProductById(doll._id)}>
                              Update
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="delete">
                        <div className="opacity">
                          <button onClick={() => deleteProductById(doll._id)}>
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
                ))}
              </section>
            </div>
          </main>
        ) : (
          <p>No Products Available. Please add some.</p>
        )}
        <div>
          <Pagination
            count={totalPages}
            getProductsByPagination={getProductsByPagination}
          />
        </div>
      </div>
    </>
  );
}
