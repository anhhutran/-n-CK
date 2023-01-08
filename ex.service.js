const express = require("express");
import cors from "cors";
import { createConnection } from "mysql";
//import connectDB from './config/connectDB';
const app = express();
app.use(json());
app.use(cors());

var con = createConnection({
  host: "localhost",
  user: "m_user",
  password: "123456",
  database: "m_user",
  multipleStatements: true,
});

app.listen(3001, () => console.log("App listening on port 3001"));
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/exercises", (req, res) => {
  var sql = "SELECT * FROM exercise";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/exercises/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    "SELECT * FROM exercise WHERE ExID = ? ",
    id,
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.post("/view", (req, res) => {
  const id = req.body.data.id;
  const name = req.body.data.name;
  con.query(
    "INSERT INTO watchedlist (name,ExID) VALUES (?,?);UPDATE exercise SET View = (SELECT(COUNT(name)) FROM watchedlist WHERE ExID = ?) WHERE ExID = ? ;",
    [name, id, id, id],
    (err, result) => {
      console.log(err);
      console.log(id, name);
    }
  );
});

app.get("/topex", (req, res) => {
  var sql = "SELECT * FROM exercise ORDER BY View DESC LIMIT 1";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/addEx", (req, res) => {
  const ExID = req.body.data.ExID;
  const ExName = req.body.data.ExName;
  const ExLink = req.body.data.ExLink;
  const ExImage = req.body.data.ExImage;
  const initView = 0;
  con.query(
    "INSERT INTO exercise (ExID,Name,LinkV,ImageV,View) VALUES (?,?,?,?,?) ",
    [ExID, ExName, ExLink, ExImage, initView],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/watchedlist/:name", (req, res) => {
  const name = req.params.name;
  con.query(
    "SELECT * FROM exercise JOIN watchedlist on exercise.ExID = watchedlist.ExID WHERE watchedlist.name = ?",
    [name],
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.get("/:search", (req, res) => {
  const name = req.params.search;
  const name2 = "%" + name + "%";
  con.query(
    "SELECT * FROM exercise WHERE Name LIKE ? ",
    [name2],
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.post("/delEx", (req, res) => {
  const ExID = req.body.data.ExID;
  con.query(
    "DELETE FROM exercise WHERE ExID =  ?;DELETE FROM WatchedList where ExID = ? ",
    [ExID, ExID],
    (err, result) => {
      console.log(err);
    }
  );
});
