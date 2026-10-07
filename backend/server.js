const express = require("express");
const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");
const { connectDatabase } = require("./src/db");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("BOT_TOKEN is missing!");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, {
  polling: true,
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  console.log("Customer:", message);
  const text = message.toLowerCase().trim();

let intent = "UNKNOWN";

if (
  text === "hi" ||
  text === "hello" ||
  text === "hey" ||
  text.includes("good morning") ||
  text.includes("good evening")
) {
  intent = "GREETING";
} else if (
  text.includes("order") ||
  text.includes("delivery") ||
  text.includes("shipment") ||
  text.includes("track")
) {
  intent = "ORDER";
}

console.log("Intent:", intent);

  if (intent === "GREETING") {
  bot.sendMessage(
    chatId,
    "Hello! 👋 I'm ClariFlow. How can I help you today?"
  );
} else if (intent === "ORDER") {
  bot.sendMessage(
    chatId,
    "Sure! I'd be happy to help you with your order. Could you provide your order number?"
  );
} else {
  bot.sendMessage(
    chatId,
    "I'd be happy to help. Could you tell me a little more about what you need?"
  );
}
});

app.get("/", (req, res) => {
  res.json({
    message: "ClariFlow Backend Running",
  });
});

app.listen(PORT, async () => {
  console.log(`ClariFlow Backend running on port ${PORT}`);

  try {
    await connectDatabase();
    console.log("Telegram bot started");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
});