import React, { useEffect, useState, useCallback, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import Whatsapp from "../components/Whatsapp";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Dolls.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loader";
import URLs from "../config/urls";

export default function Dolls(props) {
  const [products, setProducts] = useState([]);
  const [sortProduct, setSortProduct] = useState("latest"); // Default sorting
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [inLebanon, setInLebanon] = useState(true);

  const hasFetched = useRef(false); // Prevents double-fetch on mount

  let { name } = useParams();

  // Retrieve stored location data
  useEffect(() => {
    window.scrollTo(0, 0);

    const storedLocation = localStorage.getItem("inLebanon");
    if (storedLocation !== null) {
      setInLebanon(storedLocation === "true");
    }
  }, []);

  // Fetch products based on sorting or filters
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const url =
        isChecked.length > 0
          ? `${URLs.GET_PRODUCTS(props.id)}/ByCollection`
          : `${URLs.GET_PRODUCTS(props.id)}&sort=${sortProduct}`;
      const method = isChecked.length > 0 ? "post" : "get";
      const body = isChecked.length > 0 ? { collection: isChecked } : null;

      const res = await axios({
        method,
        url,
        data: body,
        headers: { "ngrok-skip-browser-warning": "anyvalue" },
      });

      setProducts(res.data.data);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      // Keep loading if no products are fetched
      setLoading(products.length === 0);
    }
  }, [sortProduct, isChecked, props.id, products.length]);

  // Fetch collections
  const fetchCollections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URLs.GET_COLLECTION_BY_ID(props.id)}`, {
        headers: { "ngrok-skip-browser-warning": "anyvalue" },
      });
      setCollection(res.data);
    } catch (err) {
      console.error("Error fetching collections:", err);
    } finally {
      setLoading(false);
    }
  }, [props.id]);

  // Fetch products & collections on mount
  useEffect(() => {
    if (!hasFetched.current) {
      fetchProducts();
      fetchCollections();
      hasFetched.current = true;
    }
  }, [fetchProducts, fetchCollections]);

  // Fetch products when sorting or filters change
  useEffect(() => {
    fetchProducts();
  }, [sortProduct, isChecked, fetchProducts]);

  // Handle checkbox selection
  const handleOnChange = (e) => {
    const { checked, value } = e.target;
    setIsChecked((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  return (
    <div>
      <Header />
      {loading || products.length === 0 ? (
        <div className="loading_div">
          <Loading />
        </div>
      ) : (
        <div className="dolls">
          <div className="categories">
            <form className="AllCategories">
              <h1>Dolls</h1>
              <div>
                <input
                  className="allcategories_inputField"
                  type="text"
                  placeholder="Search Categories..."
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </form>

            <form className="Collection_form">
              <div className="collection">
                {collection
                  .filter((val) =>
                    searchValue === ""
                      ? val
                      : val.name.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((e, index) => (
                    <div className="collection-form" key={index}>
                      <input
                        type="checkbox"
                        id={`collection-${index}`}
                        onChange={handleOnChange}
                        value={e._id}
                      />
                      <label htmlFor={`collection-${index}`}>{e.name}</label>
                    </div>
                  ))}
              </div>
            </form>
          </div>

          <div className="dolls-items">
            <div className="filter">
              <p>Sort By:</p>
              <div className="filter_By">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    onChange={(e) => setSortProduct(e.target.value)}
                    value={sortProduct}
                    displayEmpty
                  >
                    <MenuItem value="bestSeller">Best Seller</MenuItem>
                    <MenuItem value="lowest">Low Price</MenuItem>
                    <MenuItem value="highest">High Price</MenuItem>
                    <MenuItem value="latest">
                      <em>By Date</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="allDolls-items">
              <div className="items">
                {products.map((doll, index) => (
                  <div key={index} className="item">
                    <Cards doll={doll} id={doll._id} inLebanon={inLebanon} />
                  </div>
                ))}
              </div>
            </div>

            <Pagination count={totalPages} getproductsByPagination={fetchProducts} />
          </div>

          <Whatsapp />
        </div>
      )}
      <Footer />
    </div>
  );
}
