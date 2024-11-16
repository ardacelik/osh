import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { router as chatRouter } from "./chat.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api/chat", chatRouter);

app.listen(port, () => {
  console.log("Server running on 3000");
});
