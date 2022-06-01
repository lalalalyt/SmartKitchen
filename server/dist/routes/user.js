"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    db_1.client.query('select * from "user"').then((result) => {
        res.send(result.rows);
        console.log("user successfully pulled!", result.rows);
    });
});
exports.default = router;
