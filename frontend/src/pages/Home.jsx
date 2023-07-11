import React, { useEffect } from "react";
import CardBox from "../components/CardBox";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = ({ news }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <div>
      <CardBox news={news} />{" "}
      {/* Render the CardBox component and pass the 'news' prop */}
    </div>
  );
};

export default Home;
