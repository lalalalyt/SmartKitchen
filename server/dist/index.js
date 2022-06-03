"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const fridgeList_1 = __importDefault(require("./routes/fridgeList"));
const category_1 = __importDefault(require("./routes/category"));
const item_1 = __importDefault(require("./routes/item"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// app.get('/', (req, res) => {
//   res.send('Express + TypeScript Server');
// });
app.use("/user", user_1.default);
app.use("/fridge", fridgeList_1.default);
app.use("/category", category_1.default);
app.use("/item", item_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
