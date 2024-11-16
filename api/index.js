import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { router as chatRouter } from "./chat.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.info("Connected to MongoDB");
  } catch (error) {
    console.error(
      `[mongoose.connect] Caught error while connecting to DB: ${error}`
    );
  }
};

app.use("/api/chat", chatRouter);

app.listen(port, async () => {
  connect();
  console.log(`Server running on ${port}`);
});
