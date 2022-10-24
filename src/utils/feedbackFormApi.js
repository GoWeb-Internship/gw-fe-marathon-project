import axios from 'axios';

const botToken = process.env.TELEGRAM_BOT_ID;
const chatId = process.env.TELEGRAM_GROUP_ID;

const TelegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}`;

export const sendFeedbackMessage = async ({ email, name, message }) => {
  const guestName = `Повідомлення від: ${name}\n`;
  const guestEmail = `Ел. пошта: ${email}\n`;
  const guestMessage = `Повідомлення: ${message}\n`;
  const text = [guestName, guestEmail, guestMessage].join('');
  // console.log(text);

  try {
    const data = await axios.post(TelegramUrl, {
      text,
      parse_mod: 'HTML',
    });

    return data;
  } catch (error) {
    throw new Error(console.log(error));
  }
};
