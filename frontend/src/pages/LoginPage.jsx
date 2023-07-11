import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // ...

  const handleError = (err) => {
    let errorMessage = "An error occurred. Please try again";
    if (err.response && err.response.data && err.response.data.message) {
      errorMessage = err.response.data.message;
    }
    toast.error(errorMessage, {
      position: "bottom-left",
    });
  };

  // ...

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { state: { token } });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any validation errors
    const isFormValid = Object.values(formErrors).every((error) => !error);

    if (isFormValid) {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/login",
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message, token } = data;
        if (success === true) {
          handleSuccess(message);
          localStorage.setItem("token", token);
          setTimeout(() => {
            navigate("/", { state: { token } });
          }, 2000);
        } else if (success === false) {
          handleError(message);
        } else {
          handleError("An error occurred, please try again later.");
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-form-title">Login</h2>

        <div>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="login-input"
          />
          {formErrors.email && (
            <span className="error-message">{formErrors.email}</span>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Password"
            className="login-input"
          />
          {formErrors.password && (
            <span className="error-message">{formErrors.password}</span>
          )}
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
