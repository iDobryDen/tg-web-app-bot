const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5737583166:AAGdOq9XW27hmySWQtARVwvA2BYthdP4qZg';
const webAppUrl = 'https://f5b2-78-85-253-114.ngrok-free.app';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text === '/start'){
    await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
        reply_markup: {
            keyboard: [
                [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}]
            ]
        }
    })

    await bot.sendMessage(chatId, 'Заходи в наш интернет магазин', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
            ]
        }
    })
  }

  if (msg?.web_app_data?.data) {
    try {
        const data = JSON.parse(msg?.web_app_data?.data)
        console.log(data)
        await bot.sendMessage(chatId, 'Спасибо за обратную связь');
        await bot.sendMessage(chatId, 'Ваша страна :' + data.country);
        await bot.sendMessage(chatId, 'Ваша улица :' + data.street);

        setTimeout( async() => {
            await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
        }, 3000)
    } catch (e) {
        console.log(e);
    }
  }
});