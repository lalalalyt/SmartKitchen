import express from "express";
import { client } from "../db/db";
import fs from "fs";

const resetRouter = express.Router();
const dataFiles = fs
  .readdirSync("src/db/seeds", { withFileTypes: true })
  .filter(
    (item) => !item.isDirectory() && item.name.toLowerCase().endsWith(".sql")
  )
  .map((item) => item.name);

resetRouter.get("/", (req, res) => {
  client
    .query(
      `DROP TABLE IF EXISTS "user", "fridge","category","item","userItem","list", "deleteArray"`
    )
    .then(() => {
      const createTable = fs
        .readFileSync("src/db/migrations/createTable.sql")
        .toString();
      client.query(createTable).then(() => {
        dataFiles.forEach(async (filename) => {
          const addData = fs.readFileSync(`src/db/seeds/${filename}`, "utf8");
          await client.query(addData);
        });
        res.send("successfully recreate tables");
      });
    })
    .catch((error: any) => {
      console.log({ error });
    });
});

export default resetRouter;
