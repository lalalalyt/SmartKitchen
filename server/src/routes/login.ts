import express from "express";
import { client } from "../db/db";
import bcrypt from "bcryptjs";
const loginRouter = express.Router();

const bodyParser = require("body-parser");
loginRouter.use(bodyParser.urlencoded({ extended: true }));
loginRouter.use(bodyParser.json());

loginRouter.post("/", (req, res) => {
  client
    .query(
      `select * from "user" 
  where email=$1`,
      [req.body.email]
    )
    .then((result) => {
      if (bcrypt.compareSync(req.body.password, result.rows[0].password)) {
        console.log("user", result.rows[0]);
        res.send(result.rows[0]);
      } else if (result.rows.length === 0) {
        res.status(403);
        res.send("cannot find this account");
      } else {
        res.status(403);
        res.send("wrong password");
      }
    });
});

export default loginRouter;
