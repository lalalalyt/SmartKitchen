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
    // console.log("all items successfully pulled!", result.rows);
  });
});

itemRouter.get("/:fridge_type", (req, res) => {
  const text = `select * from "item" 
    where place=$1`;
  const value = [req.params.fridge_type];
  client.query(text, value).then((result) => {
    res.send(result.rows);
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
  });
});

itemRouter.get("/:fridge_type/search/:item_name", (req, res) => {
  const text = `select *
    from "item" 
    where place=$1 and name=$2`;
  const value = [req.params.fridge_type, req.params.item_name];
  client.query(text, value).then((result) => {
    res.send(result.rows);
  });
});

itemRouter.post("/:fridge_type/search/:item_name", (req, res) => {
  client
    .query(`SELECT id FROM "item" WHERE name=$1 and place=$2`, [
      req.body.name.toLowerCase().trim(),
      req.body.place,
    ])
    .then((result) => {
      if (result.rows.length != 0) return res.status(400).end();
      const insertNewItem = `
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

      client.query(insertNewItem, value).then(() => {
        client
          .query(`SELECT id FROM "item" WHERE name=$1`, [
            req.body.name.toLowerCase().trim(),
          ])
          .then((result) => {
            res.send(result.rows[0]);
          });
      });
    });
});

itemRouter.put("/:fridge_type/search/:item_name", (req, res) => {
  const updateFreshDay = `
  update "item"
  set freshDay=$1 
  where name=$2
`;
  const value = [req.body.freshDay, req.params.item_name.toLowerCase().trim()];

  client.query(updateFreshDay, value).then(() => {
    res.send("update the fresh days");
  });
});

export default itemRouter;
