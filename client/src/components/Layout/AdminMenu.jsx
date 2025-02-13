import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/dashboard/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <Person3OutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link
            to="/dashboard/admin/category"
            style={{ textDecoration: "none" }}
          >
            <li>
              <CategoryOutlinedIcon className="icon" />
              <span>Category</span>
            </li>
          </Link>

          <Link
            to="/dashboard/admin/products"
            style={{ textDecoration: "none" }}
          >
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/dashboard/admin/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlinedIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/dashboard/admin/hero" style={{ textDecoration: "none" }}>
            <li>
              <SlideshowOutlinedIcon className="icon" />
              <span>Hero Slides</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
