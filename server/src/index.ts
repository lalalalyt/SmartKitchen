import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user";

dotenv.config();

const app = express();
const port = process.env.PORT;

// app.get('/', (req, res) => {
//   res.send('Express + TypeScript Server');
// });

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
