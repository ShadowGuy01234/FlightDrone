import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">MAIN</p>
          <NavLink
            to="/dashboard/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ textDecoration: "none" }}
          >
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </NavLink>

          <p className="title">LISTS</p>
          <NavLink
            to="/dashboard/admin/users"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ textDecoration: "none" }}
          >
            <li>
              <Person3OutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </NavLink>
          <NavLink
            to="/dashboard/admin/category"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ textDecoration: "none" }}
          >
            <li>
              <CategoryOutlinedIcon className="icon" />
              <span>Category</span>
            </li>
          </NavLink>

          <NavLink
            to="/dashboard/admin/products"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ textDecoration: "none" }}
          >
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ textDecoration: "none" }}
          >
            <li>
              <CreditCardOutlinedIcon className="icon" />
              <span>Orders</span>
            </li>
          </NavLink>
          <NavLink
            to="/dashboard/admin/hero"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ textDecoration: "none" }}
          >
            <li>
              <SlideshowOutlinedIcon className="icon" />
              <span>Hero Slides</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
