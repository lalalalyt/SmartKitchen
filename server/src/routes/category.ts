import express from "express";
import { client } from "../db/db";

const categoryRouter = express.Router();

categoryRouter.get("/", (req, res) => {
  client.query('select * from "category"').then((result) => {
    res.send(result.rows);
  });
});

// categoryRouter.get("/:id", (req, res) => {
//   client.query(`select * from "category"
//   where id=$1`, [req.params.id]).then((result) => {
//     res.send(result.rows);
//     console.log("This category successfully pulled!", result.rows);
//   });
// });

export default categoryRouter;
