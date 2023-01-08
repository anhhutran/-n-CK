import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

const WatchedList = () => {
  const [exercises, setExercise] = useState([]);
  const name = localStorage.getItem("name");

  useEffect(() => {
    document.title = "Watched List";
    axios
      .get(
        "http://localhost:3001/watchedlist/" + name,

        {
          data: {
            name: name,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setExercise(response.data);
      });
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
      </ul>
      <div>
        <h2>Watched List</h2>
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
              </li>
            </ul>
          </div>
        );
      })}
      ;
    </div>
  );
};
export default WatchedList;
