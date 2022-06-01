import express from "express";
import { client } from "../db/db";

const fridgeRouter = express.Router();

fridgeRouter.get("/", (req, res) => {
  client.query('select * from "fridge"').then((result) => {
    res.send(result.rows);
    console.log("fridge list successfully pulled!", result.rows);
  });
});

export default fridgeRouter;
