import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function EditProduct() {
  toast.configure();

  const [category, setCategory] = useState([]);
  const [dollscollection, setDollsCollection] = useState([]);
  const [hoopscollection, setHoopsCollection] = useState([]);
  const [image, setImages] = useState([]);
  const [state, setState] = useState({
    name: "",
    price: "",
    size: "",
    quantity: "",
    clothes: "",
    package: "",
    category: "",
    Collection: "",
    zeinab: "",
    image: [],
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getproductById(id);
    }
  }, [id]);

  const getproductById = async (id) => {
    try {
      const response = await axios.get(
        `https://api.hopesdolls.com/api/products/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        }
      );

      if (response.status === 200) {
        setState({
          ...response.data,
          category: response.data.category?._id || "",
          Collection: response.data.Collection?._id || "",
          image: response.data.image || [],
        });
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get("https://api.hopesdolls.com/api/categories", {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      });
      setCategory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCollection = () => {
    category.forEach((each) => {
      if (each.name === "dolls") {
        getCollectionById(each._id, "dolls");
      } else if (each.name === "hoops") {
        getCollectionById(each._id, "hoops");
      }
    });
  };

  const getCollectionById = async (id, name) => {
    try {
      const res = await axios.get(
        `https://api.hopesdolls.com/api/collections/some/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "anyvalue",
          },
        }
      );
      if (name === "dolls") {
        setDollsCollection({ id, value: res.data });
      } else {
        setHoopsCollection({ id, value: res.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (category.length > 0) {
      getCollection();
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (image.image) {
      Array.from(image.image).forEach((file) => {
        formData.append("image", file);
      });
    }

    Object.entries(state).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .put(`https://api.hopesdolls.com/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "ngrok-skip-browser-warning": "asda",
        },
      })
      .then(() => {
        toast.success("Product Edited Successfully");
        setImages({ image: "" });
      })
      .catch(() => {
        toast.error("Error While Editing Product");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    setImages({ image: e.target.files });
  };

  return (
    <>
      <div className="AddProduct">
        <h2>Product</h2>

        <div className="AddProductcontainer">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="name">Name</label>
              </div>
              <div className="divProduct">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name of product.."
                  onChange={handleChange}
                  value={state.name}
                  required
                />
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="quantity">Quantity</label>
              </div>
              <div className="divProduct">
                <input
                  type="number"
                  className="quantity"
                  id="quantity"
                  name="quantity"
                  placeholder="quantity available in stock"
                  onChange={handleChange}
                  value={state.quantity}
                  required
                  min={1}
                />
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="price">Price</label>
              </div>
              <div className="divProduct">
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="price of product.."
                  onChange={handleChange}
                  value={state.price}
                  required
                />
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="size">Size</label>
              </div>
              <div className="divProduct">
                <input
                  type="text"
                  id="size"
                  name="size"
                  placeholder="size of product.."
                  onChange={handleChange}
                  value={state.size}
                  required
                />
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="clothes">Clothes</label>
              </div>
              <div className="divProduct">
                <input
                  type="text"
                  id="clothes"
                  name="clothes"
                  placeholder="clothes of product.."
                  onChange={handleChange}
                  value={state.clothes}
                  required
                />
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="package">Package</label>
              </div>
              <div className="divProduct">
                <input
                  type="text"
                  id="package"
                  name="package"
                  placeholder="package of product.."
                  onChange={handleChange}
                  value={state.package}
                  required
                />
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="Collection">Category</label>
              </div>
              <div className="divProduct">

              <select
                name="category"
                onChange={handleChange}
                value={state.category}
                required
              >
                <option value="">Select Category</option>
                {category.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="Collection">Collection</label>
              </div>

              <div className="divProduct">
                <select
                  name="Collection"
                  id="Collection"
                  onChange={handleChange}
                  value={state.Collection.name}
                  required
                >
                  {state &&
                  dollscollection &&
                  state.category === dollscollection.id
                    ? dollscollection.value.map((item, index) => {
                        return (
                          <option key={index} value={item._id} required>
                            {item.name}
                          </option>
                        );
                      })
                    : state &&
                      hoopscollection &&
                      state.category === hoopscollection.id
                    ? hoopscollection.value.map((item, index) => {
                        return (
                          <option key={index} value={item._id} required>
                            {item.name}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>
            {/* {state.image &&
              state.image.map((e, index) => {
                return (
                  <>
                    <div className="ProductEditImage" key={index}>
                      <img src={e.image} alt="" />
                    </div>
                  </>
                );
              })} */}
            <div className="ProductEditImageAll">
              {state.image &&
                state.image.map((singleImage) => {
                  return (
                    <div className="ProductEditImage">
                      <img
                        src={`https://api.hopesdolls.com/images/${singleImage}`}
                        alt="I'm an image"
                      />
                    </div>
                  );
                })}
            </div>
            <input
              type="file"
              id="file"
              name="image"
              accept=".png, .jpg, .jpeg"
              multiple
              onChange={handleImage}
            />

            <div className="addProductrow">
              <button type="submit">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default EditProduct;
