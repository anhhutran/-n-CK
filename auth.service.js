import express, { json } from "express";
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
}); 

app.listen(3000, () => console.log("App listening on port 3000"));
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/home", (req, res) => {
  var sql = "SELECT * FROM userIn";
  con.query(sql, function (err, result) {
    
    if (err) throw err;
    res.json(result);
  });
});
app.post("/register", (req, res) => {
  const id = new Date().getTime().toString();
  const username = req.body.data.username;
  const password = req.body.data.password;
  const email = req.body.data.email;

  con.query(
    "INSERT INTO userin (ID,username,password,email) VALUES (?,?,?,?) ",
    [id, username, password, email],
    (err, result) => {
      console.log(err);
      console.log(id, username, password, email);
    }
  );
});

app.post("/delete", (req, res) => {
  const username = req.body.data.username;
  con.query(
    "DELETE FROM userin WHERE username = ? ",
    username,
    (err, result) => {
      console.log(err);
      console.log(username);
    }
  );
});
