import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/Layout.css";
import { userMenu } from "./Menus/UserMenu";
import { useSelector } from "react-redux";
import Header from "../Header";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarMenu = userMenu;

  //logout handler
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfuly");
    navigate("/login");
  };

  return (
    <>
      {" "}
      <Header />
      <div className="row">
        <div className="col-md-3 sidebar">
          <div className="logo">
            <h6>JOB PORTAL</h6>
          </div>
          <hr />
          <p className="text-center text-warning">
            Welcome : {user ? user.name : ""}
          </p>
          <hr />
          <div className="menu">
            {sidebarMenu.map((menu, i) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive && "active"}`} key={i}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className={`menu-item `} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="col-md-9">{children}</div>
      </div>
    </>
  );
};

export default Layout;
