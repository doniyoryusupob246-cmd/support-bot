// import TelegramBot from 'node-telegram-bot-api';
// import { BOT_TOKEN, ADMIN_ID } from './config.js';

// export const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// console.log('🤖 Bot started');
// console.log('👑 ADMIN_ID:', ADMIN_ID, typeof ADMIN_ID);

// /**
//  * /start
//  */
// bot.onText(/\/start/, (msg) => {
//   bot.sendMessage(
//     msg.chat.id,
//     `👋 Привет!

// Это бот для сообщений, предложений и жалоб.

// ✍️ Просто напиши сообщение — я передам его администратору.
// Он ответит тебе через этот бот.`,
//   );
// });

// /**
//  * ВСЕ СООБЩЕНИЯ
//  */
// bot.on('message', async (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text;

//   console.log('\n====================');
//   console.log('📨 NEW MESSAGE');
//   console.log('from.id:', msg.from?.id);
//   console.log('chat.id:', chatId);
//   console.log('text:', text);
//   console.log('reply:', !!msg.reply_to_message);
//   console.log('====================');

//   // 🚫 игнор сообщений от бота
//   if (msg.from?.is_bot) return;

//   // 🚫 если не текст — выходим
//   if (!text) return;

//   // 🚫 команды не обрабатываем здесь
//   if (text.startsWith('/')) return;

//   /**
//    * 👑 АДМИН ОТВЕЧАЕТ (reply)
//    */
//   if (chatId === ADMIN_ID && msg.reply_to_message) {
//     const replyText = msg.reply_to_message.text;

//     // вытаскиваем USER_CHAT_ID
//     const match = replyText.match(/USER_CHAT_ID:(\d+)/);

//     if (!match) {
//       bot.sendMessage(ADMIN_ID, '❌ Не удалось определить пользователя');
//       return;
//     }

//     const userChatId = match[1];

//     await bot.sendMessage(userChatId, `💬 Ответ от поддержки:\n\n${text}`);

//     console.log('✅ Answer sent to user');
//     return;
//   }

//   /**
//    * 👤 СООБЩЕНИЕ ПОЛЬЗОВАТЕЛЯ → АДМИНУ
//    */
//   if (chatId !== ADMIN_ID) {
//     await bot.sendMessage(
//       ADMIN_ID,
//       `📩 Новое сообщение
// 👤 USER_CHAT_ID:${chatId}

// 💬 ${text}`,
//     );

//     bot.sendMessage(chatId, '✅ Сообщение отправлено администратору');
//   }
// });

// import TelegramBot from 'node-telegram-bot-api';
// import { BOT_TOKEN, ADMIN_ID } from './config.js';

// export const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// // 🧠 временное хранилище пользователей
// const users = new Map();

// console.log('🤖 Bot started');
// console.log('👑 ADMIN_ID:', ADMIN_ID, typeof ADMIN_ID);

// // 🌍 тексты
// const TEXT = {
//   ru: {
//     welcome: 'Выберите язык:',
//     mode: 'Как вы хотите написать?',
//     askName: 'Введите имя и фамилию:',
//     askPhone: 'Введите номер телефона:',
//     ready: '✍️ Напишите ваше сообщение',
//     sent: '✅ Сообщение отправлено администратору',
//   },
//   uz: {
//     welcome: 'Tilni tanlang:',
//     mode: 'Qanday yozmoqchisiz?',
//     askName: 'Ism familiyangizni kiriting:',
//     askPhone: 'Telefon raqamingizni kiriting:',
//     ready: '✍️ Xabaringizni yozing',
//     sent: '✅ Xabar administratorga yuborildi',
//   },
// };

// /**
//  * /start
//  */
// bot.onText(/\/start/, (msg) => {
//   users.set(msg.chat.id, { step: 'lang' });

//   bot.sendMessage(msg.chat.id, '🌍 Choose language / Tilni tanlang', {
//     reply_markup: {
//       keyboard: [['🇷🇺 Русский', '🇺🇿 O‘zbekcha']],
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
//   const text = msg.text;

//   if (msg.from?.is_bot) return;
//   if (!text) return;
//   if (text.startsWith('/')) return;

//   const user = users.get(chatId);

//   /**
//    * 👑 АДМИН ОТВЕЧАЕТ
//    */
//   if (chatId === ADMIN_ID && msg.reply_to_message) {
//     const match = msg.reply_to_message.text.match(/USER_CHAT_ID:(\d+)/);
//     if (!match) return;

//     const userChatId = match[1];
//     await bot.sendMessage(userChatId, `💬 Ответ от поддержки:\n\n${text}`);
//     return;
//   }

//   // если пользователь новый — игнор
//   if (!user) return;

//   /**
//    * 🌍 ВЫБОР ЯЗЫКА
//    */
//   if (user.step === 'lang') {
//     user.lang = text.includes('Рус') ? 'ru' : 'uz';
//     user.step = 'mode';

//     bot.sendMessage(chatId, TEXT[user.lang].mode, {
//       reply_markup: {
//         keyboard: [['👤 Представиться', '🕶 Анонимно']],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     });
//     return;
//   }

//   /**
//    * 🕶 / 👤 РЕЖИМ
//    */
//   if (user.step === 'mode') {
//     user.anonymous = text.includes('Аноним') || text.includes('Anonim');

//     if (user.anonymous) {
//       user.step = 'message';
//       bot.sendMessage(chatId, TEXT[user.lang].ready, {
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

//   /**
//    * 📞 ТЕЛЕФОН
//    */
//   if (user.step === 'phone') {
//     user.phone = text;
//     user.step = 'message';
//     bot.sendMessage(chatId, TEXT[user.lang].ready);
//     return;
//   }

//   /**
//    * ✉️ СООБЩЕНИЕ ПОЛЬЗОВАТЕЛЯ
//    */
//   if (user.step === 'message') {
//     const info = user.anonymous
//       ? '🕶 Аноним'
//       : `👤 ${user.name}\n📞 ${user.phone}`;

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

import TelegramBot from 'node-telegram-bot-api';
import { BOT_TOKEN, ADMIN_ID } from './config.js';

export const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// 🧠 временное хранилище состояний
const users = new Map();

// 🌍 тексты
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
    shareContact: '📞 Поделиться контактом',
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
    shareContact: '📞 Kontaktni ulashish',
  },
};

/**
 * /start
 */
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

/**
 * ВСЕ СООБЩЕНИЯ
 */
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  // 🚫 игнор сообщений от бота
  if (msg.from?.is_bot) return;

  const user = users.get(chatId);

  /**
   * 📞 ПОЛУЧЕНИЕ КОНТАКТА
   */
  if (msg.contact) {
    if (!user || user.step !== 'phone') return;

    user.phone = msg.contact.phone_number;
    user.step = 'message';

    bot.sendMessage(chatId, TEXT[user.lang].writeMsg, {
      reply_markup: { remove_keyboard: true },
    });
    return;
  }

  const text = msg.text;
  if (!text) return;
  if (text.startsWith('/')) return;

  /**
   * 👑 АДМИН ОТВЕЧАЕТ (reply)
   */
  if (chatId === ADMIN_ID && msg.reply_to_message) {
    const match = msg.reply_to_message.text.match(/USER_CHAT_ID:(\d+)/);
    if (!match) return;

    const userChatId = match[1];

    await bot.sendMessage(userChatId, `💬 Ответ от поддержки:\n\n${text}`);
    return;
  }

  // если пользователь не начал /start
  if (!user) return;

  /**
   * 🌍 ВЫБОР ЯЗЫКА
   */
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

  /**
   * 👤 / 🕶 РЕЖИМ
   */
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

  /**
   * 👤 ИМЯ
   */
  if (user.step === 'name') {
    user.name = text;
    user.step = 'phone';

    bot.sendMessage(chatId, TEXT[user.lang].askPhone, {
      reply_markup: {
        keyboard: [
          [
            {
              text: TEXT[user.lang].shareContact,
              request_contact: true,
            },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
    return;
  }

  /**
   * ✉️ СООБЩЕНИЕ ПОЛЬЗОВАТЕЛЯ
   */
  if (user.step === 'message') {
    const info = user.anonymous ? '🕶 Аноним' : `👤 ${user.name}\n📞 ${user.phone}`;

    await bot.sendMessage(
      ADMIN_ID,
      `📩 Новое сообщение
👤 USER_CHAT_ID:${chatId}

${info}

💬 ${text}`,
    );

    bot.sendMessage(chatId, TEXT[user.lang].sent);
  }
});
