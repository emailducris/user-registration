const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "crudgames",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { login } = req.body;
  const { name } = req.body;
  const { nickname } = req.body;
  const { date } = req.body;

  let SQL =
    "INSERT INTO users ( login, name, nickname, date ) VALUES (?,?,?,?)";

  db.query(SQL, [login, name, nickname, date], (err, result) => {
    console.log(err);
  });

  console.log(login);
});

app.get("/get", (req, res) => {
  let SQL = "SELECT * FROM users";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.body;
  const { login } = req.body;
  const { name } = req.body;
  const { nickname } = req.body;
  const { date } = req.body;

  let SQL =
    "UPDATE users SET login = ?, name = ?, nickname = ?, date = ? WHERE iduser = ? ";

  db.query(SQL, [login, name, nickname, date, id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let SQL = "DELETE FROM users WHERE login = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.listen(3001, () => {
  console.log("rodando servidor");
});
