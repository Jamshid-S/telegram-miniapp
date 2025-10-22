const fetch = require("node-fetch");

// مشخصات ربات و کاربر
const botToken = "8375250081:AAFa-N94QPs6rm0qjZ3TIiBFXg-a5FCr9hc";
const chatId = 1286052028;
const webAppUrl = "https://warm-jobs-smile.loca.lt/";

// ساخت بدنه پیام
const body = {
  chat_id: chatId,
  text: "Button your order",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Book order", web_app: { url: webAppUrl } }
      ]
    ]
  }
};

// ارسال پیام به تلگرام
fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
})
.then(res => res.json())
.then(json => console.log("پیام ارسال شد:", json))
.catch(err => console.error("خطا در ارسال پیام:", err));
