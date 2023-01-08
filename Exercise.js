import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

const Exercise = () => {
  if (localStorage.hasOwnProperty("name") == false) {
    <Link to="/" />;
  }
  const [exercises, setExercise] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  useEffect(() => {
    document.title = "Exercises";
    axios
      .get("http://localhost:3001/exercise")
      .then((res) => setExercise(res.data));
  }, []);
  function handleNoneFilter() {
    axios
      .get("http://localhost:3001/exercise")
      .then((res) => setExercise(res.data));
  }
  function handleViewASC() {
    const ExASC = [...exercises].sort((a, b) => a.View - b.View);
    setExercise(ExASC);
  }
  function handleViewDESC() {
    const ExASC = [...exercises].sort((a, b) => b.View - a.View);
    setExercise(ExASC);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchStr) {
      axios
        .get(
          "http://localhost:3001/" + searchStr,

          {
            data: {
              search: searchStr,
            },
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setExercise(response.data);
          setSearchStr("");
        });
    } else {
      alert("Cannot be blank");
    }
  };
  return (
    <div>
      <ul>
        <li>
          <div className="active">
            <Link to="/home">Home</Link>
          </div>
        </li>
        <li>
          <div>
            <Link to="/exercises">Exercises</Link>
          </div>
        </li>
      </ul>
      <h2>Exercise</h2>
      <div>
        {" "}
        Filter
        <button className="btn" onClick={handleNoneFilter}>
          None
        </button>
        <button className="btn" onClick={handleViewASC}>
          View &#x2191;{" "}
        </button>
        <button className="btn" onClick={handleViewDESC}>
          View &#x2193;{" "}
        </button>
        <form className="form">
          <input
            type="text"
            id="searchStr"
            name="searchStr"
            placeholder="Search.."
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
          />
          <button type="submit" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      {exercises.map((exercise) => {
        const { ExID, Name, LinkV, ImageV, View } = exercise;
        return (
          <div key={ExID}>
            <ul className="item">
              <li key={ExID}>
                <img src={ImageV} width="250" height="150" alt={Name}></img>
                <div>
                  <Link to={`/exercises/${ExID}`}>{Name}</Link>
                </div>
                <h4 className="product">{View} views</h4>
              </li>
            </ul>
          </div>
        );
      })}
      ;
    </div>
  );
};
export default Exercise;
