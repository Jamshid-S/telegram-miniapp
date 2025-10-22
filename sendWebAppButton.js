// sendWebAppButton.js
import TelegramBot from 'node-telegram-bot-api';

// Replace with your bot token
const token = '8375250081:AAFa-N94QPs6rm0qjZ3TIiBFXg-a5FCr9hc';
const bot = new TelegramBot(token, { polling: true });

// Listen for the /openapp command
bot.onText(/\/openapp/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Click the button below to open your mini-app:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open Mini App",
            web_app: { url: "https://telegram-miniapp-1-4na1.onrender.com/webapp.html" }
          }
        ]
      ]
    }
  });
});
