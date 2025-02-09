import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import Admins from "./Admins/Admins";
import AddAdmin from "./Admins/AddAdmin";
import EditAdmin from "./Admins/EditAdmin";
import Categories from "./Categories/Categories";
import AddCategory from "./Categories/AddCategory";
import EditCategory from "./Categories/EditCategory";
import About from "./About/About";
import AddAbout from "./About/AddAbout";
import Collection from "./Collections/Collection";
import AddCollection from "./Collections/AddCollection";
import EditCollection from "./Collections/EditCollection";
import Orders from "./Orders/Orders";
import ViewOrder from "./Orders/ViewOrder";
import Product from "./Products/Products";
import AddProduct from "./Products/AddProduct";
import Video from "./Video/Video";
import AddVideo from "./Video/AddVideo";
import EditVideo from "./Video/EditVideo";
import EditProduct from "./Products/EditProduct";
import ProductHoops from "./Products//ProductsHoops";
import axios from "axios";
import Emails from "./Emails/Email";
import Coupons from "./Coupons/Coupons";
import CreateCoupon from "./Coupons/CreateCoupon/CreateCoupon";
import EditeCoupon from "./Coupons/EditCoupon/EditCoupon";
function Dashboard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getcategories();
  }, []);

  const getcategories = async () => {
    let res = await axios.get(`https://api.hopesdolls.com/api/categories`, {
      headers: {
        "ngrok-skip-browser-warning": "asd",
      },
    });
    try {
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/admins" element={<Admins />} />
        <Route path="/addadmin" element={<AddAdmin />} />
        <Route path="/editadmin/:id" element={<EditAdmin />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/editcategory/:id" element={<EditCategory />} />
        <Route path="/about" element={<About />} />
        <Route path="/addabout" element={<AddAbout />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/addcollection" element={<AddCollection />} />
        <Route path="/editcollection/:id" element={<EditCollection />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/vieworder/:id" element={<ViewOrder />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/coupons/add" element={<CreateCoupon />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/videos" element={<Video />} />
        <Route path="/emails" element={<Emails />} />
        <Route path="/addvideo" element={<AddVideo />} />
        <Route path="/editvideo/:id" element={<EditVideo />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/viewcoupon/:id" element={<EditeCoupon />} />

        {/* <Route path="/products/dolls" element={<Product />} />
        <Route path="/products/hoops" element={<ProductHoops />} /> */}

        {categories.map((each) => {
          return each.name === "dolls" ? (
            <Route
              key={each._id}
              path="/products/dolls"
              element={<Product id={each._id} />}
            />
          ) : (
            <Route
              key={each._id}
              path="/products/hoops"
              element={<ProductHoops id={each._id} />}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default Dashboard;
