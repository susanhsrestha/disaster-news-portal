import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
} from "mdb-react-ui-kit";
import { Icon } from "@mdi/react";
import { mdiMenu, mdiClose } from "@mdi/js";
import newspaper from "./newspaper.png"; // Import the PNG image
import "../css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar-wrapper ${isNavbarVisible ? "visible" : "hidden"} nav`}
    >
      <MDBNavbar
        expand="lg"
        bgColor="background-color: linear-gradient(to bottom right, #74ebd5, #9face6);"
        fixed="top"
      >
        <MDBContainer fluid>
          <Link to="/" className="navbar-brand">
            <img src={newspaper} alt="newspaper" />
            <span className="navbar-heading">DNC</span>
          </Link>
          <div className="nav-style">
            <MDBNavbarToggler onClick={toggleCollapse}>
              <Icon path={isOpen ? mdiClose : mdiMenu} size={1} />
            </MDBNavbarToggler>
            <MDBCollapse show={isOpen} navbar>
              <MDBNavbarNav className="ml-auto">
                {token && (
                  <MDBNavbarItem>
                    <Link
                      to="/"
                      className={`nav-link hover-underline-animation ${
                        location.pathname === "/" ? "active" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </MDBNavbarItem>
                )}
                {/* About */}
                <MDBNavbarItem>
                  <MDBNavbarLink
                    href="#"
                    className={`hover-underline-animation ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                  >
                    About
                  </MDBNavbarLink>
                </MDBNavbarItem>
                {/* Predict */}
                {token && (
                  <MDBNavbarItem>
                    <Link
                      to="/predict"
                      className={`nav-link hover-underline-animation ${
                        location.pathname === "/predict" ? "active" : ""
                      }`}
                    >
                      Predict
                    </Link>
                  </MDBNavbarItem>
                )}
              </MDBNavbarNav>
              {/* Login/Register or Logout */}
              <MDBNavbarNav className="ml-auto">
                <MDBNavbarItem>
                  {token ? (
                    <button
                      className="nav-link hover-underline-animation"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className={`nav-link hover-underline-animation ${
                        location.pathname === "/login" ? "active" : ""
                      }`}
                    >
                      Login/Signup
                    </Link>
                  )}
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </div>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Navbar;
