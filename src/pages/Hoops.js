import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import Whatsapp from "../components/Whatsapp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loader";
import URLs from "../config/urls";
import "./Dolls.css";

export default function Dolls(props) {
  const [product, setProducts] = useState([]);
  const [sortProduct, setSortProducts] = useState("latest");
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [inLebanon, setInLebanon] = useState(true);

  useEffect(() => {
    const storedLocation = localStorage.getItem("inLebanon");
    if (storedLocation !== null) {
      setInLebanon(storedLocation === "true");
    }
  }, []);

  useEffect(() => {
    getproducts();
    getCollections();
  }, [sortProduct]);

  useEffect(() => {
    if (isChecked.length > 0) getCollectionsApi();
    else getproducts();
  }, [isChecked]);

  let { name } = useParams();

  const getproducts = async () => {
    try {
      let res = await axios.get(
        `${URLs.GET_PRODUCTS(props.id)}&sort=${sortProduct}`,
        {
          headers: { "ngrok-skip-browser-warning": "anyvalue" },
        }
      );
      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getproductsByPagination = async (page_id) => {
    try {
      let res = await axios.get(
        `${URLs.GET_PRODUCTS(props.id, page_id, sortProduct)}`,
        {
          headers: { "ngrok-skip-browser-warning": "anyvalue" },
        }
      );
      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getCollections = async () => {
    try {
      let res = await axios.get(`${URLs.GET_COLLECTION_BY_ID(props.id)}`, {
        headers: { "ngrok-skip-browser-warning": "anyvalue" },
      });
      setCollection(res.data);
      setLoading(false);
    } catch (err) {
      console.log("err ", err);
    }
  };

  const getCollectionsApi = async () => {
    try {
      const body = { collection: isChecked };
      let res = await axios.post(
        `${URLs.GET_PRODUCTS(props.id)}/ByCollecction`,
        body,
        {
          headers: { "ngrok-skip-browser-warning": "anyvalue" },
        }
      );
      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.log("err ", err);
    }
  };

  const handleOnChange = (e) => {
    const { checked, value } = e.target;
    setIsChecked(checked ? [...isChecked, value] : isChecked.filter((each) => each !== value));
  };

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
              <input
                className="allcategories_inputField"
                type="text"
                placeholder="Search Categories.."
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>

            <form className="Collection_form">
              <div className="collection">
                {collection
                  .filter((val) => searchValue === "" || val.name.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((e, index) => (
                    <div className="collection-form" key={index}>
                      <input
                        type="checkbox"
                        id={`collection ${index}`}
                        onChange={handleOnChange}
                        value={e._id}
                      />
                      <label htmlFor={`collection ${index}`}>{e.name}</label>
                    </div>
                  ))}
              </div>
            </form>
          </div>

          <div className="dools-items">
            <div className="filter">
              <p>Sort By:</p>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  onChange={(e) => setSortProducts(e.target.value)}
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

            <div className="allDolls-items">
              <div className="items">
                {product.map((doll, index) => (
                  <div key={index} className="item">
                    <Cards doll={doll} id={doll._id} inLebanon={inLebanon} />
                  </div>
                ))}
              </div>
            </div>

            <Pagination count={totalPages} getproductsByPagination={getproductsByPagination} />
          </div>
          <Whatsapp />
        </div>
      )}
      <Footer />
    </div>
  );
}
