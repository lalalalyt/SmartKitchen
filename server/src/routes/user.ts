import express from "express";
import { client } from "../db/db";
import { getUserWithEmail, getUserWithName } from "../helpers";
import bcrypt from "bcryptjs";

const userRouter = express.Router();

const bodyParser = require("body-parser");
userRouter.use(bodyParser.urlencoded({ extended: true }));
userRouter.use(bodyParser.json());

userRouter.get("/", (req, res) => {
  client.query('select * from "user"').then((result) => {
    res.send(result.rows);
  });
});

userRouter.get("/:id", (req, res) => {
  client
    .query(`select * from "fridge" where user_id=$1`, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    });
});

userRouter.post("/", (req, res) => {
  if (req.body.name && req.body.email && req.body.password) {
    Promise.all([
      getUserWithName(req.body.name),
      getUserWithEmail(req.body.email),
    ]).then((exist) => {
      if (!exist[0] && !exist[1]) {
        const password = req.body.password;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const text = `insert into "user" (id, name, email, password)
        values(setval(pg_get_serial_sequence('user', 'id'), (SELECT MAX(id) FROM "user")+1), $1, $2, $3)
        returning *`;
        const value = [
          req.body.name,
          req.body.email.toLowerCase(),
          hashedPassword,
        ];
        client.query(text, value).then((result) => {
          res.send(result.rows);
        });
      } else if (exist[0]) {
        //"name already exists"
        res.status(400);
        res.send({ error: "name already exists" });
      } else if (exist[1]) {
        //"email already exists"
        res.status(400);
        res.send({ error: "email already exists" });
      }
    });
  } else if (!req.body.name) {
    res.status(400);
    res.send({ error: "empty name" });
  } else if (!req.body.email) {
    res.status(400);
    res.send({ error: "empty email" });
  } else if (!req.body.password) {
    res.status(400);
    res.send({ error: "empty password" });
  }
});

export default userRouter;
