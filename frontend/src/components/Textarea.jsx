import React, { useState } from "react";
import axios from "axios";

const PredictPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/predict", {
        input: inputValue,
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
            width: "300px",
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

export default PredictPage;
