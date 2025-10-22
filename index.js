// ===========================
// 1️⃣ Express Mini-App Server
// ===========================
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'; // Load environment variables

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Example API routes for orders ---
let orders = [];

app.get('/api/orders', (req, res) => res.json(orders));

app.post('/api/orders', (req, res) => {
  const id = orders.length + 1;
  const order = { id, status: 'pending', ...req.body };
  orders.push(order);
  res.json({ success: true, id });
});

app.put('/api/orders/:id', (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = req.body.status || order.status;
  res.json({ success: true });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`✅ Mini-app server running on port ${PORT}`);
});

// ===========================
// 2️⃣ Telegram Bot
// ===========================
import TelegramBot from 'node-telegram-bot-api';

// Use BOT_TOKEN from Render environment variables
const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("❌ BOT_TOKEN is missing! Set it in Render environment variables.");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Welcome! Click below to open the mini-app:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open Mini App",
            web_app: {
              url: process.env.WEBAPP_URL || `https://your-render-url.onrender.com/webapp.html`
            }
          }
        ]
      ]
    }
  });
});

bot.onText(/\/openapp/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Click below to open the mini-app:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open Mini App",
            web_app: {
              url: process.env.WEBAPP_URL || `https://your-render-url.onrender.com/webapp.html`
            }
          }
        ]
      ]
    }
  });
});

console.log("🤖 Telegram bot running!");
