import express from "express";
import { client } from "../db/db";

const router = express.Router();

router.get("/", (req, res) => {
  client.query('select * from "user"').then((result) => {
    res.send(result.rows);
    console.log("user successfully pulled!", result.rows);
  });
});

export default router;
