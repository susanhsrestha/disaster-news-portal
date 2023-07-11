import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Predict = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  const [inputValue, setInputValue] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/classify/", {
        news: inputValue,
      });
      // Handle the response from the API
      setPredictionResult(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your input here"
          style={{
            width: "100%",
            height: "150px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "none",
          }}
        ></textarea>
        <button
          onClick={handlePredict}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#FF4081",
            color: "white",
            cursor: "pointer",
          }}
        >
          Predict
        </button>
        {predictionResult && (
          <div style={{ marginTop: "20px" }}>
            <p>Input News: {predictionResult.input_news}</p>
            <p>Preprocessed News: {predictionResult.preprocessed_news}</p>
            <p>Is Disaster Related: {predictionResult.is_disaster_related}</p>
            {predictionResult.is_disaster_related === 0 && (
              <p>No disaster-related information found.</p>
            )}
            {predictionResult.is_disaster_related === 1 && (
              <p>Class: {predictionResult.class}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;
