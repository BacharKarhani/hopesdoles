import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cards from "../components/Cards";
import Whatsapp from "../components/Whatsapp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loader";
import "./Dolls.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Dolls(props) {
  const [product, setProducts] = useState([]);
  const [sortProduct, setSortProducts] = useState("");
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [inLebanon, setInLebanon] = useState(true);

  const productsPerPage = 6;

  useEffect(() => {
    const storedLocation = localStorage.getItem("inLebanon");
    if (storedLocation !== null) {
      setInLebanon(storedLocation === "true");
    }
  }, []);

  useEffect(() => {
    getProducts();
    getCollections();
  }, []);

  useEffect(() => {
    if (isChecked.length > 0) getCollectionsApi();
    else getProducts();
  }, [isChecked]);

  let { name } = useParams();

  const getProducts = async () => {
    try {
      let res = await axios.get(
        `https://api.hopesdolls.com/api/products/some/${props.id}`,
        {
          headers: { "ngrok-skip-browser-warning": "anyvalue" },
        }
      );
      setProducts(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getCollections = async () => {
    try {
      let res = await axios.get(
        `https://api.hopesdolls.com/api/collections/some/${props.id}`,
        {
          headers: { "ngrok-skip-browser-warning": "anyvalue" },
        }
      );
      setCollection(res.data);
      setLoading(false);
    } catch (err) {
      console.log("err ", err);
    }
  };

  const getCollectionsApi = async () => {
    const body = { collection: isChecked };
    try {
      let res = await axios.post(
        `https://api.hopesdolls.com/api/products/ByCollecction`,
        body,
        {
          headers: { "ngrok-skip-browser-warning": "anyvalue" },
        }
      );
      setProducts(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log("err ", err);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.checked;
    const collection_id = e.target.value;

    if (value) {
      setIsChecked([...isChecked, collection_id]);
    } else {
      setIsChecked(isChecked.filter((each) => each !== collection_id));
    }
  };

  // **Pagination Logic**
  const totalPages = Math.ceil(product.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = product.slice(startIndex, startIndex + productsPerPage);

  return (
    <div>
      <Header />
      {loading ? (
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
                  placeholder="Search Categories.."
                  name="search"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </form>

            <form className="Collection_form">
              <div className="collection">
                {collection
                  .filter((val) => searchValue === "" || val.name.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((e, index) => (
                    <div className="collection-form" key={index}>
                      <input
                        type="checkbox"
                        id={`collection${index}`}
                        onChange={handleOnChange}
                        name="collection"
                        value={e._id}
                      />
                      <label htmlFor={`collection${index}`}>{e.name}</label>
                    </div>
                  ))}
              </div>
            </form>
          </div>

          <div className="dools-items">
            <div className="filter">
              <div>
                <p>Sort By:</p>
                <div className="filter_By">
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      onChange={(e) => setSortProducts(e.target.value)}
                      value={sortProduct}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>By Date</em>
                      </MenuItem>
                      <MenuItem value="2">Highest</MenuItem>
                      <MenuItem value="1">Lowest</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>

            <div className="allDolls-items">
              <div className="items">
                {displayedProducts
                  .slice()
                  .sort((a, b) => {
                    if (sortProduct === "1") return a.price - b.price;
                    if (sortProduct === "2") return b.price - a.price;
                    return 0;
                  })
                  .map((doll, index) => (
                    <div key={index} className="item">
                      <Cards doll={doll} id={doll._id} inLebanon={inLebanon} />
                    </div>
                  ))}
              </div>
            </div>

            {/* Pagination Buttons */}
            <div className="pagination">
              <button
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>

          <Whatsapp />
        </div>
      )}
      <Footer />
    </div>
  );
}
