import express from "express";
import { client } from "../db/db";

const itemRouter = express.Router();
const bodyParser = require("body-parser");
itemRouter.use(bodyParser.urlencoded({ extended: true }));
itemRouter.use(bodyParser.json());

itemRouter.get("/", (req, res) => {
  const text = `
  select * from "item"`;
  client.query(text).then((result) => {
    res.send(result.rows);
    console.log("all items successfully pulled!", result.rows);
  });
});

itemRouter.get("/:fridge_type", (req, res) => {
  const text = `select * from "item" 
    where place=$1`;
  const value = [req.params.fridge_type];
  client.query(text, value).then((result) => {
    res.send(result.rows);
    console.log(
      "all items for this type of fridge successfully pulled!",
      result.rows
    );
  });
});
itemRouter.get("/:fridge_type/:category_name", (req, res) => {
  const text = `select item.id,  item.name as item_name, item.place, item.freshday, category.id,category.name as category_name
    from "item" 
    join "category" on category_id=category.id
    where item.place=$1 and category.name=$2`;
  const value = [req.params.fridge_type, req.params.category_name];
  client.query(text, value).then((result) => {
    res.send(result.rows);
    console.log("item of this category successfully pulled!", result.rows);
  });
});

itemRouter.get("/:fridge_type/search/:item_name", (req, res) => {
  const text = `select *
    from "item" 
    where place=$1 and name=$2`;
  const value = [req.params.fridge_type, req.params.item_name];
  client.query(text, value).then((result) => {
    res.send(result.rows);
    console.log("This item successfully pulled!", result.rows);
  });
});

itemRouter.post("/:fridge_type/search/:item_name", (req, res) => {
  const text = `
  insert into "item" (category_id, name, place, freshDay, id )
  select id, $2, $3, $4, setval(pg_get_serial_sequence('item', 'id'), (SELECT MAX(id) FROM "item")+1) from "category"
  where name=$1;
`;
  const value = [
    req.body.itemCategory,
    req.body.name,
    req.body.place,
    req.body.freshDay,
  ];

  client.query(text, value).then(() => {
    console.log("New item added!");
  });

  client
    .query(
      `SELECT MAX(id) FROM "item"`
    )
    .then((result) => {
      res.send({item_id: result.rows[0].max});
    });
});

export default itemRouter;

