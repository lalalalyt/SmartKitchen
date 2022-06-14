import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import fridgeRouter from "./routes/fridgeList";
import categoryRouter from "./routes/category";
import itemRouter from "./routes/item";
import resetRouter from "./routes/resetDB";

dotenv.config();

const app = express();
const port = process.env.PORT;

// app.get('/', (req, res) => {
//   res.send('Express + TypeScript Server');
// });

app.use("/user", userRouter);

app.use("/fridge", fridgeRouter);

app.use("/category", categoryRouter);

app.use("/item", itemRouter);

app.use("/reset", resetRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
