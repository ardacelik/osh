import OpenAI from "openai";
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

export const router = Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    console.info(`Received prompt: ${question}`);

    if (!question) throw new Error(`Question is ${question}`);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });

    const llmResponse = completion.choices[0].message.content;

    console.info(`Response received from LLM: ${llmResponse}`);
    res.json({ content: llmResponse });
  } catch (error) {
    console.error(`[POST /chat] Caught error: ${error}`);
  }
});
