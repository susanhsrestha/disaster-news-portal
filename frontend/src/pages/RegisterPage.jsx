import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleError = (err) => {
    let errorMessage = "An error occurred. Please try again";
    if (err.response && err.response.data && err.response.data.message) {
      errorMessage = err.response.data.message;
    }

    toast.error(errorMessage, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { state: { token } });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message, token } = data;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (!success && message.errors) {
        const errorMessages = message.errors;
        setErrors({
          email: errorMessages.email || "",
          password: errorMessages.password || "",
          username: errorMessages.username || "",
        });
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }

    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-form-title">Register</h2>

        <div>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
            className="login-input"
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="login-input"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
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
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="login-button">
          Register
        </button>

        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
