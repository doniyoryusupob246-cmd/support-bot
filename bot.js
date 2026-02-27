// import TelegramBot from 'node-telegram-bot-api';
// import { BOT_TOKEN, ADMIN_ID } from './config.js';

// export const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// // 🧠 временное хранилище состояний
// const users = new Map();

// // 🌍 тексты
// const TEXT = {
//   ru: {
//     chooseLang: '🌍 Выберите язык:',
//     chooseMode: 'Как вы хотите написать?',
//     chooseModeVar: '👤 Представиться',
//     chooseModeVar2: '🕶 Анонимно',
//     askName: 'Введите имя и фамилию:',
//     askPhone: 'Поделитесь номером телефона:',
//     writeMsg: '✍️ Напишите ваше сообщение',
//     sent: '✅ Сообщение отправлено администратору',
//     shareContact: '📞 Поделиться контактом',
//   },
//   uz: {
//     chooseLang: '🌍 Tilni tanlang:',
//     chooseMode: 'Qanday yozmoqchisiz?',
//     chooseModeVar: "👤 O'zingizni tanishtiring",
//     chooseModeVar2: '🕶 Anonim',
//     askName: 'Ism va familiyangizni kiriting:',
//     askPhone: 'Telefon raqamingizni ulashing:',
//     writeMsg: '✍️ Xabaringizni yozing',
//     sent: '✅ Xabar administratorga yuborildi',
//     shareContact: '📞 Kontaktni ulashish',
//   },
// };

// /**
//  * /start
//  */
// bot.onText(/\/start/, (msg) => {
//   users.set(msg.chat.id, { step: 'lang' });

//   bot.sendMessage(msg.chat.id, TEXT.ru.chooseLang, {
//     reply_markup: {
//       keyboard: [['🇺🇿 O‘zbekcha', '🇷🇺 Русский']],
//       resize_keyboard: true,
//       one_time_keyboard: true,
//     },
//   });
// });

// /**
//  * ВСЕ СООБЩЕНИЯ
//  */
// bot.on('message', async (msg) => {
//   const chatId = msg.chat.id;

//   // 🚫 игнор сообщений от бота
//   if (msg.from?.is_bot) return;

//   const user = users.get(chatId);

//   const text = msg.text;
//   if (!text) return;
//   if (text.startsWith('/')) return;

//   /**
//    * 👑 АДМИН ОТВЕЧАЕТ (reply)
//    */
//   if (chatId === ADMIN_ID && msg.reply_to_message) {
//     const match = msg.reply_to_message.text.match(/USER_CHAT_ID:(\d+)/);
//     if (!match) return;

//     const userChatId = match[1];

//     await bot.sendMessage(userChatId, `💬 Ответ от поддержки:\n\n${text}`);
//     return;
//   }

//   // если пользователь не начал /start
//   if (!user) return;

//   /**
//    * 🌍 ВЫБОР ЯЗЫКА
//    */
//   if (user.step === 'lang') {
//     user.lang = text.includes('Рус') ? 'ru' : 'uz';
//     user.step = 'mode';

//     bot.sendMessage(chatId, TEXT[user.lang].chooseMode, {
//       reply_markup: {
//         keyboard: [[TEXT[user.lang].chooseModeVar, TEXT[user.lang].chooseModeVar2]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     });
//     return;
//   }

//   /**
//    * 👤 / 🕶 РЕЖИМ
//    */
//   if (user.step === 'mode') {
//     user.anonymous = text.includes('Аноним') || text.includes('Anonim');

//     if (user.anonymous) {
//       user.step = 'message';
//       bot.sendMessage(chatId, TEXT[user.lang].writeMsg, {
//         reply_markup: { remove_keyboard: true },
//       });
//     } else {
//       user.step = 'name';
//       bot.sendMessage(chatId, TEXT[user.lang].askName);
//     }
//     return;
//   }

//   /**
//    * 👤 ИМЯ
//    */
//   if (user.step === 'name') {
//     user.name = text;
//     user.step = 'phone';

//     bot.sendMessage(chatId, TEXT[user.lang].askPhone);
//     return;
//   }

//   if (user.step === 'phone') {
//     user.phone = text;
//     user.step = 'message';

//     bot.sendMessage(chatId, TEXT[user.lang].writeMsg);
//     return;
//   }

//   /**
//    * ✉️ СООБЩЕНИЕ ПОЛЬЗОВАТЕЛЯ
//    */
//   if (user.step === 'message') {
//     const info = user.anonymous ? '🕶 Аноним' : `👤 ${user.name}\n📞 ${user.phone}`;

//     await bot.sendMessage(
//       ADMIN_ID,
//       `📩 Новое сообщение
// 👤 USER_CHAT_ID:${chatId}

// ${info}

// 💬 ${text}`,
//     );

//     bot.sendMessage(chatId, TEXT[user.lang].sent);
//   }
// });

// import TelegramBot from 'node-telegram-bot-api';
// import { BOT_TOKEN, ADMIN_ID } from './config.js';

// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // -------------------------
// // 📁 Работа с файлами
// // -------------------------

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const DATA_DIR = path.join(__dirname, 'data');
// const DATA_PATH = path.join(DATA_DIR, 'messages.json');

// // создаём папку если нет
// if (!fs.existsSync(DATA_DIR)) {
//   fs.mkdirSync(DATA_DIR);
// }

// // создаём файл если нет
// if (!fs.existsSync(DATA_PATH)) {
//   fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
// }

// // функция сохранения
// function saveMessage(data) {
//   try {
//     const file = fs.readFileSync(DATA_PATH, 'utf-8');
//     const messages = JSON.parse(file);

//     messages.push(data);

//     fs.writeFileSync(DATA_PATH, JSON.stringify(messages, null, 2));
//   } catch (err) {
//     console.error('Ошибка сохранения:', err);
//   }
// }

// // -------------------------
// // 🤖 Telegram Bot
// // -------------------------

// export const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// // временное хранилище состояний
// const users = new Map();

// // тексты
// const TEXT = {
//   ru: {
//     chooseLang: '🌍 Выберите язык:',
//     chooseMode: 'Как вы хотите написать?',
//     chooseModeVar: '👤 Представиться',
//     chooseModeVar2: '🕶 Анонимно',
//     askName: 'Введите имя и фамилию:',
//     askPhone: 'Поделитесь номером телефона:',
//     writeMsg: '✍️ Напишите ваше сообщение',
//     sent: '✅ Сообщение отправлено администратору',
//   },
//   uz: {
//     chooseLang: '🌍 Tilni tanlang:',
//     chooseMode: 'Qanday yozmoqchisiz?',
//     chooseModeVar: "👤 O'zingizni tanishtiring",
//     chooseModeVar2: '🕶 Anonim',
//     askName: 'Ism va familiyangizni kiriting:',
//     askPhone: 'Telefon raqamingizni ulashing:',
//     writeMsg: '✍️ Xabaringizni yozing',
//     sent: '✅ Xabar administratorga yuborildi',
//   },
// };

// // -------------------------
// // /start
// // -------------------------

// bot.onText(/\/start/, (msg) => {
//   users.set(msg.chat.id, { step: 'lang' });

//   bot.sendMessage(msg.chat.id, TEXT.ru.chooseLang, {
//     reply_markup: {
//       keyboard: [['🇺🇿 O‘zbekcha', '🇷🇺 Русский']],
//       resize_keyboard: true,
//       one_time_keyboard: true,
//     },
//   });
// });

// // -------------------------
// // ВСЕ СООБЩЕНИЯ
// // -------------------------

// bot.on('message', async (msg) => {
//   const chatId = msg.chat.id;

//   if (msg.from?.is_bot) return;

//   const user = users.get(chatId);
//   const text = msg.text;

//   if (!text) return;
//   if (text.startsWith('/')) return;

//   // 👑 Ответ администратора
//   if (chatId === ADMIN_ID && msg.reply_to_message) {
//     const match = msg.reply_to_message.text.match(/USER_CHAT_ID:(\d+)/);
//     if (!match) return;

//     const userChatId = match[1];

//     await bot.sendMessage(userChatId, `💬 Ответ от поддержки:\n\n${text}`);
//     return;
//   }

//   if (!user) return;

//   // 🌍 Выбор языка
//   if (user.step === 'lang') {
//     user.lang = text.includes('Рус') ? 'ru' : 'uz';
//     user.step = 'mode';

//     bot.sendMessage(chatId, TEXT[user.lang].chooseMode, {
//       reply_markup: {
//         keyboard: [[TEXT[user.lang].chooseModeVar, TEXT[user.lang].chooseModeVar2]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     });
//     return;
//   }

//   // 👤 / 🕶 режим
//   if (user.step === 'mode') {
//     user.anonymous = text.includes('Аноним') || text.includes('Anonim');

//     if (user.anonymous) {
//       user.step = 'message';
//       bot.sendMessage(chatId, TEXT[user.lang].writeMsg, {
//         reply_markup: { remove_keyboard: true },
//       });
//     } else {
//       user.step = 'name';
//       bot.sendMessage(chatId, TEXT[user.lang].askName);
//     }
//     return;
//   }

//   // 👤 имя
//   if (user.step === 'name') {
//     user.name = text;
//     user.step = 'phone';

//     bot.sendMessage(chatId, TEXT[user.lang].askPhone);
//     return;
//   }

//   // 📞 телефон
//   if (user.step === 'phone') {
//     user.phone = text;
//     user.step = 'message';

//     bot.sendMessage(chatId, TEXT[user.lang].writeMsg);
//     return;
//   }

//   // ✉️ сообщение
//   if (user.step === 'message') {
//     const info = user.anonymous ? '🕶 Аноним' : `👤 ${user.name}\n📞 ${user.phone}`;

//     const messageData = {
//       chatId,
//       name: user.name || null,
//       phone: user.phone || null,
//       anonymous: user.anonymous,
//       message: text,
//       date: new Date().toISOString(),
//     };

//     // сохраняем в файл
//     saveMessage(messageData);

//     await bot.sendMessage(
//       ADMIN_ID,
//       `📩 Новое сообщение
// 👤 USER_CHAT_ID:${chatId}

// ${info}

// 💬 ${text}`,
//     );

//     await bot.sendMessage(chatId, TEXT[user.lang].sent);

//     // очищаем состояние
//     users.delete(chatId);
//   }
// });

import TelegramBot from 'node-telegram-bot-api';
import { BOT_TOKEN, ADMIN_ID } from './config.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// -------------------------
// 📁 Работа с файлами
// -------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DATA_PATH = path.join(DATA_DIR, 'messages.json');

// создаём папку если нет
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// создаём файл если нет
if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
}

function saveMessage(data) {
  try {
    const file = fs.readFileSync(DATA_PATH, 'utf-8');
    const messages = JSON.parse(file);

    messages.push(data);

    fs.writeFileSync(DATA_PATH, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('Ошибка сохранения:', err);
  }
}

// -------------------------
// 🤖 Telegram Bot
// -------------------------

export const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// временное хранилище состояний
const users = new Map();

// тексты
const TEXT = {
  ru: {
    chooseLang: '🌍 Выберите язык:',
    chooseMode: 'Как вы хотите написать?',
    chooseModeVar: '👤 Представиться',
    chooseModeVar2: '🕶 Анонимно',
    askName: 'Введите имя и фамилию:',
    askPhone: 'Поделитесь номером телефона:',
    writeMsg: '✍️ Напишите ваше сообщение',
    sent: '✅ Сообщение отправлено администратору',
  },
  uz: {
    chooseLang: '🌍 Tilni tanlang:',
    chooseMode: 'Qanday yozmoqchisiz?',
    chooseModeVar: "👤 O'zingizni tanishtiring",
    chooseModeVar2: '🕶 Anonim',
    askName: 'Ism va familiyangizni kiriting:',
    askPhone: 'Telefon raqamingizni ulashing:',
    writeMsg: '✍️ Xabaringizni yozing',
    sent: '✅ Xabar administratorga yuborildi',
  },
};

// -------------------------
// /start
// -------------------------

bot.onText(/\/start/, (msg) => {
  users.set(msg.chat.id, { step: 'lang' });

  bot.sendMessage(msg.chat.id, TEXT.ru.chooseLang, {
    reply_markup: {
      keyboard: [['🇺🇿 O‘zbekcha', '🇷🇺 Русский']],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

// -------------------------
// ВСЕ СООБЩЕНИЯ
// -------------------------

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.from?.is_bot) return;

  const user = users.get(chatId);
  const text = msg.text;

  if (!text) return;
  if (text.startsWith('/')) return;

  // 👑 Ответ администратора
  if (chatId === ADMIN_ID && msg.reply_to_message) {
    const match = msg.reply_to_message.text.match(/USER_CHAT_ID:(\d+)/);
    if (!match) return;

    const userChatId = match[1];

    await bot.sendMessage(userChatId, `💬 Ответ от поддержки:\n\n${text}`);
    return;
  }

  if (!user) return;

  // 🌍 Выбор языка
  if (user.step === 'lang') {
    user.lang = text.includes('Рус') ? 'ru' : 'uz';
    user.step = 'mode';

    bot.sendMessage(chatId, TEXT[user.lang].chooseMode, {
      reply_markup: {
        keyboard: [[TEXT[user.lang].chooseModeVar, TEXT[user.lang].chooseModeVar2]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
    return;
  }

  // 👤 / 🕶 режим
  if (user.step === 'mode') {
    user.anonymous = text.includes('Аноним') || text.includes('Anonim');

    if (user.anonymous) {
      user.step = 'message';
      bot.sendMessage(chatId, TEXT[user.lang].writeMsg, {
        reply_markup: { remove_keyboard: true },
      });
    } else {
      user.step = 'name';
      bot.sendMessage(chatId, TEXT[user.lang].askName);
    }
    return;
  }

  // 👤 имя
  if (user.step === 'name') {
    user.name = text;
    user.step = 'phone';

    bot.sendMessage(chatId, TEXT[user.lang].askPhone);
    return;
  }

  // 📞 телефон
  if (user.step === 'phone') {
    user.phone = text;
    user.step = 'message';

    bot.sendMessage(chatId, TEXT[user.lang].writeMsg);
    return;
  }

  // ✉️ сообщение (можно писать сколько угодно)
  if (user.step === 'message') {
    const info = user.anonymous ? '🕶 Аноним' : `👤 ${user.name}\n📞 ${user.phone}`;

    const messageData = {
      chatId,
      name: user.name || null,
      phone: user.phone || null,
      anonymous: user.anonymous,
      message: text,
      date: new Date().toISOString(),
    };

    saveMessage(messageData);

    await bot.sendMessage(
      ADMIN_ID,
      `📩 Новое сообщение
👤 USER_CHAT_ID:${chatId}

${info}

💬 ${text}`,
    );

    await bot.sendMessage(chatId, TEXT[user.lang].sent);

    // состояние НЕ удаляем
  }
});
