import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ShowHide from "./ShowHide";
import "./index.css";

const SignUp = () => {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [typeErr, setErr] = useState("");
  const [typeAcc, setAcc] = useState("");
  let input = false;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    document.title = "Sign Up";
    axios.get("http://localhost:3000/home").then((res) => setUsers(res.data));
  }, []);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const Submit = (e) => {
    e.preventDefault();
    input = true;
    for (let i = 0; i < users.length; i++) {
      if (usernameReg === users[i].username) {
        console.log(input);
        input = false;
        setErr("Already have user");
        setPasswordReg("");
        setEmailReg("");
        {
          break;
        }
      }
    }
    if (usernameReg) {
    } else {
      input = false;
      setErr("Username cannot be blank");
    }
    if (passwordReg) {
    } else {
      input = false;
      setErr("Password cannot be blank");
    }
    if (emailReg) {
      if (validateEmail(emailReg)) {
      } else {
        input = false;
        setErr("Invalid Email");
      }
    } else {
      input = false;
      setErr("Email cannot be blank");
    }
    console.log(input);
    if (input) {
      axios
        .post(
          "http://localhost:3000/register",

          {
            data: {
              username: usernameReg,
              password: passwordReg,
              email: emailReg,
            },
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
      console.log(usernameReg, passwordReg, emailReg);
      setAcc("Tạo thành công");
      setUsernameReg("");
      setPasswordReg("");
      setEmailReg("");
    } else {
      setPasswordReg("");
      setEmailReg("");
    }
  };

  return (
    <>
      <ul>
        <li>
          <div>SignUp</div>
        </li>
      </ul>
      <article>
        <form className="form">
          <div className="form-control">
            <label htmlFor="usernameReg">username: </label>
            <input
              type="text"
              id="usernameReg"
              name="usernameReg"
              value={usernameReg}
              onChange={(e) => setUsernameReg(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="passwordReg">password: </label>
            <input
              type="text"
              id="passwordReg"
              name="passwordReg"
              value={passwordReg}
              onChange={(e) => setPasswordReg(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="emailReg">Email: </label>
            <input
              type="text"
              id="emailReg"
              name="emailReg"
              value={emailReg}
              onChange={(e) => setEmailReg(e.target.value)}
            />
          </div>
          <button type="submit" onClick={Submit}>
            Sign Up
          </button>
          <div>
            <Link to="/">Back to LogIn</Link>
          </div>
          <div style={{ color: "blue" }}>
            <ShowHide message={typeAcc} />
          </div>
          <div style={{ color: "red" }}>
            <ShowHide message={typeErr} />
          </div>
        </form>
      </article>
    </>
  );
};

export default SignUp;
