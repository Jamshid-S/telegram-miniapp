import TelegramBot from "node-telegram-bot-api";

// Replace with your token
const token = "8375250081:AAFa-N94QPs6rm0qjZ3TIiBFXg-a5FCr9hc";

const bot = new TelegramBot(token, { polling: false });

async function test() {
  try {
    const me = await bot.getMe();
    console.log("✅ BOT_TOKEN works! Bot info:", me);
  } catch (err) {
    console.error("❌ BOT_TOKEN test failed:", err);
  }
}

test();
