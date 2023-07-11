import React, { useState, useEffect } from "react";
import axios from "axios";
import { TfiTwitter } from "react-icons/tfi";
import moment from "moment";
import { Box, styled } from "@mui/system";
import { BsClock } from "react-icons/bs";
import Card from "@mui/material/Card";
import jwt from "jwt-decode";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "../css/CardBox.css";

const userId = jwt(localStorage.getItem("token")).id;
const StyledCard = styled(Card)({
  marginBottom: 10,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(5px)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  borderRadius: "10px",
  width: "375px",
});

const CustomCardContent = styled(CardContent)({
  height: "200px",
  overflow: "hidden",
});

const CustomCardContent2 = styled(CardContent)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "35px",
  overflow: "hidden",
});

const CardBox = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReadMore, setShowReadMore] = useState(true);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const token = localStorage.getItem("token");
  const [filterClassName, setFilterClassName] = useState("");

  const handleFilterChange = (event) => {
    setFilterClassName(event.target.value);
    setStart(0);
    setEnd(10);
  };

  const fetchNews = async (className) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:4000/api/news/related?start=${start}&end=${end}&className=${className}`,
        config
      );

      if (response.data.length > 0) {
        const updatedNews = response.data.map((item) => ({
          ...item,
          upvoted: item.upvotedBy.includes(userId),
        }));
        setNews([...updatedNews]);
        // Increment start and end values for the next page
        setStart((prevStart) => prevStart + response.data.length);
        setEnd((prevEnd) => prevEnd + response.data.length);
      } else {
        setShowReadMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpvote = async (itemId) => {
    try {
      await axios.post(
        `http://localhost:4000/api/news/news/${itemId}/upvote`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Find the updated news item in the response
      const updatedNews = news.map((item) => {
        if (item._id === itemId) {
          // If the item was already upvoted, decrease the count and reset the upvoted flag
          if (item.upvoted) {
            return {
              ...item,
              upvotes: item.upvotes - 1,
              upvoted: false,
            };
          }
          // Otherwise, increase the count and set the upvoted flag
          return {
            ...item,
            upvotes: item.upvotes + 1,
            upvoted: true,
          };
        }
        return item;
      });

      setNews(updatedNews);
    } catch (error) {
      console.error("Error upvoting news:", error);
    }
  };

  useEffect(() => {
    fetchNews(filterClassName);
  }, [filterClassName]);

  const filterDivStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  const selectStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#333",
    transition: "border-color 0.3s ease-in-out",
  };

  return (
    <div className="bgbg">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        overflow="auto"
        paddingTop="100px"
        style={{
          background: "linear-gradient(to bottom right, #74ebd5, #9face6)",
        }}
      >
        <div style={filterDivStyle}>
          <select
            value={filterClassName}
            onChange={handleFilterChange}
            style={selectStyle}
            onFocus={(e) => (e.target.style.borderColor = "#FF4081")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          >
            <option value="">All</option>
            <option value="Weather Events">Weather Events</option>
            <option value="Natural Disasters">Natural Disasters</option>
            <option value="Human-Caused Disasters">
              Human-Caused Disasters
            </option>
            <option value="Accidents and Incidents">
              Accidents and Incidents
            </option>
            <option value="Public Health Emergencies">
              Public Health Emergencies
            </option>
            <option value="Most Upvoted">Most Upvoted</option>
            <option value="Most Recent">Most Recent</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="card-container">
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : news.length > 0 ? (
            news.map((item) => (
              <div className="card-item" key={item.id}>
                <StyledCard>
                  <CardHeader
                    title={<TfiTwitter size="30px" color="black" />}
                    action={
                      <Box display="flex" alignItems="center">
                        <BsClock
                          size={15}
                          color="textSecondary"
                          style={{ marginRight: "6px", marginTop: "7px" }}
                        />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginTop: "12px" }}
                        >
                          {moment(item.timestamp).startOf("hour").fromNow()}
                        </Typography>
                      </Box>
                    }
                  />
                  <CustomCardContent>
                    <Typography align="justify">{item.text}</Typography>
                  </CustomCardContent>
                  <CustomCardContent2>
                    {item.class && <Typography>{item.class}</Typography>}
                  </CustomCardContent2>
                  <CardActions disableSpacing>
                    <Button
                      variant="contained"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        backgroundColor: "#FF4081",
                        color: "white",
                        "&:hover": {
                          background:
                            "linear-gradient(to bottom right, #74ebd5, #9face6)",
                        },
                      }}
                    >
                      READ MORE
                    </Button>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => handleUpvote(item._id)}
                      color={item.upvoted ? "error" : "inherit"}
                    >
                      {item.upvotes}
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </StyledCard>
              </div>
            ))
          ) : (
            <Typography>No news available</Typography>
          )}
        </div>
      </Box>
      {showReadMore && (
        <div className="more-news-container">
          <Button
            variant="contained"
            onClick={() => fetchNews(filterClassName)}
            disabled={loading}
            sx={{
              backgroundColor: "#FF4081",
              color: "white",
              "&:hover": {
                background:
                  "linear-gradient(to bottom right, #74ebd5, #9face6)",
              },
            }}
          >
            {loading ? "Loading..." : "More News"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardBox;
