import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { router as chatRouter } from "./chat.js";
import mongoose from "mongoose";
import UserChats from "./models/user-chats.js";
import Chat from "./models/chat.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
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

app.post("/api/chats", ClerkExpressRequireAuth({}), async (req, res) => {
  const userId = req.auth.userId;

  const { question } = req.body;
  console.info(`Received prompt: ${question}`);

  try {
    const newChat = new Chat({
      userId,
      history: [{ role: "user", content: [{ text: question }] }],
    });

    const savedChat = await newChat.save();

    const userChats = await UserChats.find({ userId });

    if (!userChats.length) {
      const newUserChat = new UserChats({
        userId,
        chats: [
          {
            _id: savedChat._id,
            title: question.substring(0, 30),
          },
        ],
      });

      await newUserChat.save();
    } else {
      await UserChats.updateOne(
        { userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: question.substring(0, 40),
            },
          },
        }
      );

      res.status(201).send(newChat._id);
    }
  } catch (error) {
    console.error(`[/api/chats] Caught error ${error}`);
    res
      .status(500)
      .send(`Encountered error while creating the chat: ${error.message}`);
  }
});

app.get("/api/user-chats", ClerkExpressRequireAuth({}), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.find({ userId });

    res.status(200).send(userChats[0].chats);
  } catch (error) {
    console.error(
      `[/api/user-chats] Caught error while fetching chats: ${error}`
    );
    res
      .status(500)
      .send(`Encountered error while fetching user chats: ${error.message}`);
  }
});

app.get("/api/chats/:id", ClerkExpressRequireAuth({}), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });

    res.status(200).send(chat);
  } catch (error) {
    console.error(
      `[/api/chats/:id] Caught error while fetching chat: ${error}`
    );
    res
      .status(500)
      .send(`Encountered error while fetching a user chat: ${error.message}`);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, async () => {
  connect();
  console.log(`Server running on ${port}`);
});
