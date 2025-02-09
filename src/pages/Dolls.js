import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import Whatsapp from "../components/Whatsapp";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Dolls.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loader";

export default function Dolls(props) {
  const [product, setProducts] = useState([]);
  const [sortProduct, setSortProducts] = useState(product);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [value, setValue] = useState(3);
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
  }, []);

  useEffect(() => {
    if (isChecked.length > 0) getCollectionsApi();
    else getproducts();
  }, [isChecked]);

  let { name } = useParams();
  const getproducts = async () => {
    let res = await axios.get(
      // `https://api.hopesdolls.com/api/products/some/62ac613cf0f4b51c7f817101`
      `https://api.hopesdolls.com/api/products/some/${props.id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      }
    );
    try {
      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getproductsByPagination = async (page_id) => {
    let res = await axios.get(
      `https://api.hopesdolls.com/api/products/some/${props.id}?page=${page_id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      }
    );
    try {
      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getCollections = async () => {
    let res = await axios.get(
      `https://api.hopesdolls.com/api/collections/some/${props.id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      }
    );
    try {
      setCollection(res.data);
      setLoading(false);
    } catch (err) {
      console.log("err ", err);
    }
  };

  const getCollectionsApi = async () => {
    const body = { collection: isChecked };
    let res = await axios.post(
      `https://api.hopesdolls.com/api/products/ByCollecction`,
      body,
      {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      }
    );
    try {
      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.log("err ", err);
    }
  };

  // const handleOnChange = (event) => {
  const handleOnChange = (e, name) => {
    const value = e.target.checked;
    const collection_id = e.target.value;

    if (value === true) {
      setIsChecked([...isChecked, e.target.value]);
    } else {
      let new_Array = isChecked;
      new_Array = new_Array.filter((each) => each !== collection_id);
      setIsChecked(new_Array);
    }
  };

  return (
    <div>
      {" "}
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
                <inputname
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
                  .filter((val) => {
                    if (searchValue === "") {
                      return val;
                    } else if (
                      val.name.toLowerCase().includes(searchValue.toLowerCase())
                    )
                      return val;
                  })

                  .map((e, index) => {
                    return (
                      <div className="collection-form" key={index}>
                        <input
                          type="checkbox"
                          id={`collection ${index}`}
                          onChange={(event) => handleOnChange(event, e.name)}
                          name={"collection"}
                          value={e._id}
                        />

                        <label htmlFor={`collection ${index}`}>{e.name}</label>
                      </div>
                    );
                  })}
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
                      onChange={(e) => {
                        const selected = e.target.value;
                        setSortProducts(selected);
                        setValue(selected);
                      }}
                      value={value}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="3">
                        <em>By Date</em> {/* Now sorts by `createdAt` */}
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
                {product &&
                  product
                    .slice()
                    .sort((a, b) => {
                      if (sortProduct === "1") return a.price - b.price;
                      if (sortProduct === "2") return b.price - a.price;
                      if (sortProduct === "3")
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      return 0;
                    })
                    .map((doll, index) => (
                      <div key={index} className="item">
                        <Cards
                          doll={doll}
                          id={doll._id}
                          inLebanon={inLebanon}
                        />
                      </div>
                    ))}
              </div>
            </div>

            <div>
              <Pagination
                count={totalPages}
                getproductsByPagination={getproductsByPagination}
              />
            </div>
          </div>

          <Whatsapp />
        </div>
      )}
      <Footer />
    </div>
  );
}
