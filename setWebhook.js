import fetch from "node-fetch";

// Replace with your bot token and Render URL
const BOT_TOKEN = process.env.BOT_TOKEN || "8375250081:AAFa-N94QPs6rm0qjZ3TIiBFXg-a5FCr9hc";
const RENDER_URL = process.env.RENDER_URL || "https://telegram-miniapp-1-4na1.onrender.com";

// Telegram webhook endpoint
const WEBHOOK_URL = `${RENDER_URL}/bot`;

async function setWebhook() {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}`
    );
    const data = await response.json();

    if (data.ok) {
      console.log(`✅ Webhook set successfully to: ${WEBHOOK_URL}`);
    } else {
      console.error("❌ Failed to set webhook:", data);
    }
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

// Run
setWebhook();
