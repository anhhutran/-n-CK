import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

const HomePage = () => {
  const [exercise, setExercise] = useState([]);
  function handleLogOut() {
    localStorage.removeItem("ID");
    localStorage.removeItem("name");
    localStorage.removeItem("IDad");
    localStorage.removeItem("nameAd");
  }
  useEffect(() => {
    document.title = "Home";
    axios
      .get("http://localhost:3001/topex")
      .then((res) => setExercise(res.data));
  }, []);
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
        <li>
          <div>
            <Link to="/watchedlist">WatchedList</Link>
          </div>
        </li>
      </ul>
      <div>
        <h2>Top Exercise</h2>
      </div>

      {exercise.map((e) => {
        const { ExID, Name, LinkV, ImageV, View } = e;
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
      <button className="btn" onClick={handleLogOut}>
        <Link to="/">LogOut</Link>
      </button>
    </div>
  );
};

export default HomePage;
