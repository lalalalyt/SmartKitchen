"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const URL = "postgres://bviktfvi:4AZ_zlgmVXulMi0VWt6F1qs4Sy_4rgDF@fanny.db.elephantsql.com/bviktfvi";
const client = new pg_1.Client(URL);
exports.client = client;
client
    .connect()
    .catch((err) => console.error("could not connect to postgres", err));
// client.query("select now() as now")
// client.query("select version()")
// Check tables
client
    .query(`
  SELECT *
  FROM pg_catalog.pg_tables
  WHERE schemaname != 'pg_catalog' 
  AND schemaname != 'information_schema';
    `)
    .then((res) => console.log(res.rows[0]))
    .catch((err) => console.error(err.stack));
//Add tables
client.query(`

`);
