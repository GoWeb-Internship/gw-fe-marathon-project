import axios from 'axios';

const botToken = process.env.GATSBY_TELEGRAM_BOT_ID;
const chatId = process.env.GATSBY_TELEGRAM_GROUP_ID;

const TelegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}`;

export const sendFeedbackMessage = async ({ email, name, message }) => {
  const guestName = `Повідомлення від: ${name}\n`;
  const guestEmail = `Ел. пошта: ${email}\n`;
  const guestMessage = `Повідомлення: ${message}\n`;
  const text = [guestName, guestEmail, guestMessage].join('');

  try {
    const data = await axios.post(TelegramUrl, {
      text,
      parse_mod: 'HTML',
    });

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
