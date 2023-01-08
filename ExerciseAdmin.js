import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

const ExerciseAdmin = () => {
  const [newExID, setExID] = useState("");
  const [newExName, setExName] = useState("");
  const [newExLink, setExLink] = useState("");
  const [newExImage, setExImage] = useState("");
  const [exercises, setExercise] = useState([]);
  useEffect(() => {
    document.title = "Exercise Admin";
    axios
      .get("http://localhost:3001/exercise")
      .then((res) => setExercise(res.data));
    const ExASC = [...exercises].sort((a, b) => b.View - a.View);
    setExercise(ExASC);
  }, []);

  function handleAddEx() {
    axios
      .post(
        "http://localhost:3001/addEx",

        {
          data: {
            ExID: newExID,
            ExName: newExName,
            ExLink: newExLink,
            ExImage: newExImage,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  function handleDelEx(e) {
    axios
      .post(
        "http://localhost:3001/delEx",

        {
          data: {
            ExID: e,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3001/exercise")
      .then((res) => setExercise(res.data));
    const ExASC = [...exercises].sort((a, b) => b.View - a.View);
    setExercise(ExASC);
  }

  return (
    <div>
      <ul>
        <li>
          <div className="active">
            <Link to="/homeAdmin">Home</Link>
          </div>
        </li>
      </ul>
      <article>
        <form className="form">
          <h4>Add Exercise</h4>
          <div className="form-control">
            <label htmlFor="newExID">ExID: </label>
            <input
              type="text"
              id="newExID"
              name="newExID"
              value={newExID}
              onChange={(e) => setExID(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="newExName">Ex Name: </label>
            <input
              type="text"
              id="newExName"
              name="newExName"
              value={newExName}
              onChange={(e) => setExName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="newExLink">Video url: </label>
            <input
              type="text"
              id="newExLink"
              name="newExLink"
              value={newExLink}
              onChange={(e) => setExLink(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="newExImage">Image url: </label>
            <input
              type="text"
              id="newExImage"
              name="newExImage"
              value={newExImage}
              onChange={(e) => setExImage(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleAddEx}>
            Add
          </button>
        </form>
      </article>
      {exercises.map((exercise) => {
        const { ExID, Name, LinkV, ImageV, View } = exercise;
        return (
          <div key={ExID}>
            <ul className="item">
              <li key={ExID}>
                <img src={ImageV} width="250" height="150" alt={Name}></img>
                {/* <div>
                  <Link to={`/exercises/${ExID}`}>{Name}</Link>
                </div> */}
                <div>
                  {Name}
                  <button className="btn" onClick={() => handleDelEx(ExID)}>
                    x
                  </button>
                </div>
                <h4>View:{View}</h4>
              </li>
            </ul>
          </div>
        );
      })}
      ;
    </div>
  );
};
export default ExerciseAdmin;
