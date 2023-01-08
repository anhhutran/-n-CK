import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

const HomeAdmin = () => {
  const [user, setUser] = useState([]);
  function handleLogOut() {
    localStorage.removeItem("IDad");
    localStorage.removeItem("nameAd");
  }
  useEffect(() => {
    document.title = "Home Admin";
    axios.get("http://localhost:3000/home").then((res) => setUser(res.data));
  }, []);

  function handleDelete(e) {
    axios
      .post(
        "http://localhost:3000/delete",

        {
          data: {
            username: e,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    axios.get("http://localhost:3000/home").then((res) => setUser(res.data));
  }
  return (
    <div>
      <ul>
        <li>
          <div className="active">
            <Link to="/homeAdmin">Home</Link>
          </div>
        </li>
        <li>
          <div>
            <Link to="/exercisesAd">Exercises</Link>
          </div>
        </li>
      </ul>
      <h2>User</h2>
      {user.map((e) => {
        const { ID, username } = e;
        return (
          <div key={ID} className="user">
            <ul>
              <li>
                <div>
                  {username}
                  <button
                    className="btn"
                    onClick={() => handleDelete(username)}
                  >
                    x
                  </button>
                </div>
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

export default HomeAdmin;
