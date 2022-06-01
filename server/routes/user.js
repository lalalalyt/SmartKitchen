const express = require("express");
const app = express();
const port = 8000;

const { query } = require("../db/db.js");

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });

app.get("/user", (req, res) => {
  query('select * from "user"').then(result=>res.send(result.rows));
});
