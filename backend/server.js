const express = require("express");
const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");

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

  bot.sendMessage(chatId, `You said: ${message}`);
});

app.get("/", (req, res) => {
  res.json({
    message: "ClariFlow Backend Running",
  });
});

app.listen(PORT, () => {
  console.log(`ClariFlow Backend running on port ${PORT}`);
  console.log("Telegram bot started");
});
