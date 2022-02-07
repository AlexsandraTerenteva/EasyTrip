const TelegramApi = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;

const bot = new TelegramApi(token, { polling: true });

bot.on('message', async (msg) => {
  const { text } = msg;
  const chatId = msg.chat.id;
  if (text === '/start') {
    await bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот EasyTripBot!');
  }
  if (text === '/ticket') {
    await bot.sendDocument(chatId, '../5.png');
    await bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот EasyTripBot!');
  }
});
