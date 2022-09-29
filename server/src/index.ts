import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import fridgeRouter from "./routes/fridgeList";
import categoryRouter from "./routes/category";
import itemRouter from "./routes/item";
import resetRouter from "./routes/resetDB";
import loginRouter from "./routes/login"


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// app.get('/', (req, res) => {
//   res.send('Express + TypeScript Server');
// });
app.use(cors())
app.use("/user", userRouter);

app.use("/login", loginRouter);

app.use("/fridge", fridgeRouter);

app.use("/category", categoryRouter);

app.use("/item", itemRouter);

app.use("/reset", resetRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
