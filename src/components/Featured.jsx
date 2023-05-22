import { PlayArrow } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import axiosconfig from "../config/axiosconfig";
import { Link } from "react-router-dom";

function Featured({ type, setGenre }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const res = await axiosconfig.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomMovie();
  }, [type]);

  return (
    <div className="featured">
      <div className="info"></div>
    </div>
  );
}

export default Featured;
