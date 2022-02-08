/* eslint-disable max-len */
const TelegramApi = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN_BOT;
const bot = new TelegramApi(token, { polling: true });
const startBot = () => {
  const buttons = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Авторизация', callback_data: 'auth' }],
        [{ text: 'Получить авиабилет', callback_data: 'ticket' }],
        [{ text: 'Получить билет на экскурсию', callback_data: 'excursion' }],
      ],
    }),
  };
  const userKeyboard = [[{ text: 'кнопока 1', callback_data: 'ready' }]];
  bot.setMyCommands([
    { command: '/ticket', description: 'Мой билет на рейс!!!' },
    { command: '/excursion', description: 'Предстоящая экскурсия' },
  ]);
  bot.on('message', async (msg) => {
    const { text } = msg;
    const chatId = msg.chat.id;
    if (text === '/start') {
      return bot.sendMessage(chatId, 'Привет! Добро пожаловать в телеграм бот EasyTripBot!', buttons);
    }
    if (text === '/ticket') {
      await bot.sendMessage(chatId, 'Отправляю Ваш билет!');
      return bot.sendDocument(chatId, 'pdf/ticket.pdf');
    }
    if (text === '/excursion') {
      await bot.sendMessage(chatId, 'Отправляю сведения о предстоящей экскурсии!');
      return bot.sendDocument(chatId, 'pdf/excursion.pdf');
    }
    return bot.sendMessage(chatId, 'Ваша команда не распознана, попробуйте еще раз!');
  });
  bot.on('callback_query', async (msg) => {
    const chatId = msg.message.chat.id;
    if (msg.data === 'ticket') {
      await bot.sendMessage(chatId, 'Отправляю Ваш билет!');
      return bot.sendDocument(chatId, 'pdf/ticket.pdf');
    }
    if (msg.data === 'excursion') {
      await bot.sendMessage(chatId, 'Отправляю сведения о предстоящей экскурсии!');
      return bot.sendDocument(chatId, 'pdf/excursion.pdf');
    }
    if (msg.data === 'auth') {
      await bot.sendMessage(chatId, 'Введите email');
      await bot.editMessageReplyMarkup({ inline_keyboard: userKeyboard }, { chat_id: chatId, message_id: msg.message.message_id });
    }
    return bot.sendMessage(chatId, 'Ваша команда не распознана, попробуйте еще раз!');
  });
};
startBot();
