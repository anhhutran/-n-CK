import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import ShowHide from "./ShowHide";
import "./index.css";

const LogIn = () => {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [log, setLog] = useState(false);
  const [typeErr, setErr] = useState("");
  const [admin, setAcess] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.title = "Log In";
    axios.get("http://localhost:3000/home").then((res) => setUsers(res.data));
  }, []);

  const Submit = (e) => {
    e.preventDefault();

    for (let i = 0; i < users.length; i++) {
      if (usernameLog === "name1" && users[i].username === "name1") {
        if (passwordLog === users[i].password) {
          localStorage.setItem("IDAD", users[i].ID);
          localStorage.setItem("nameAD", usernameLog);
          setAcess(true);
          break;
        } else {
          setErr("Wrong password");
          setPasswordLog("");
          continue;
        }
      }
      if (usernameLog.valueOf() == users[i].username.valueOf()) {
        if (passwordLog.valueOf() == users[i].password.valueOf()) {
          console.log("success");
          setLog(true);
          localStorage.setItem("ID", users[i].ID);
          localStorage.setItem("name", usernameLog);
          setUsernameLog("");
          setPasswordLog("");
          break;
        }
        setLog(false);
        setPasswordLog("");
        setErr("Wrong password please try again ");
      }
    }
    if (usernameLog) {
    } else {
      setErr("Username cannot be blank");
    }
    if (passwordLog) {
    } else {
      setErr("Password cannot be blank");
    }
  };
  if (admin) {
    return <Navigate to="/homeAdmin" />;
  }
  if (log) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <ul>
        <li>
          <div>Sign In</div>
        </li>
      </ul>
      <article>
        <form className="form">
          <div className="form-control">
            <label htmlFor="usernameLog">username: </label>
            <input
              type="text"
              id="usernameLog"
              name="usernameLog"
              value={usernameLog}
              onChange={(e) => setUsernameLog(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="passwordLog">password: </label>
            <input
              type="password"
              id="passwordLog"
              name="passwordLog"
              value={passwordLog}
              onChange={(e) => setPasswordLog(e.target.value)}
            />
          </div>
          <button type="submit" onClick={Submit}>
            LogIn
          </button>
          <div>
            <Link to="/SignUp">Register</Link>
          </div>
          <div style={{ color: "red" }}>
            <ShowHide message={typeErr} />
          </div>
        </form>
      </article>
    </>
  );
};

export default LogIn;
