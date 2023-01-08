import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ShowHide from "./ShowHide";
import axios from "axios";
import "./index.css";

const Detail = (props) => {
  const id = useParams();
  const [exercises, setExercises] = useState([]);
  const [ID, setID] = useState(id.id);
  const [line, setLine] = useState(false);
  useEffect(() => {
    document.title = id.id;
    axios
      .get(
        "http://localhost:3001/exercise/" + id.id,

        {
          data: {
            id: ID,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setExercises(response.data);
      });
  }, []);
  function handleView() {
    axios
      .post(
        "http://localhost:3001/view",

        {
          data: {
            id: ID,
            name: localStorage.getItem("name"),
          },
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    setLine("Added to watched list");
  }
  return exercises.map((exercise) => {
    const { ExID, Name, LinkV, ImageV, View } = exercise;
    return (
      <>
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
        <article key={ExID}>
          <iframe
            width="420"
            height="315"
            src={LinkV}
            allowFullScreen="allowfullscreen"
          ></iframe>
          <div>{Name}</div>
        </article>
        <div>
          <button className="btn" onClick={handleView}>
            Mark As Seen
          </button>
          <ShowHide message={line} />
        </div>
      </>
    );
  });
};
export default Detail;
