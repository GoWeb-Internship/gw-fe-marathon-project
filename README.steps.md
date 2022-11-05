## Gatsby.js

- [Загальний туторіал](https://www.gatsbyjs.com/docs/tutorial/) Обов'язково
  ознайомитись!!!
- Контен проекту написаний на основі
  [Markdown](https://gist.github.com/Jekins/2bf2d0638163f1294637), файлів з
  розширенням .md - плагіном для їх обробки слугує
  ["gatsby-transformer-remark"](https://www.gatsbyjs.com/docs/working-with-images-in-markdown/#using-the-transformer-remark-plugin)
- Офіційний туторіал Gatsby на момент створення проекту вже використовує .mdx
  файли та плагін
  ["gatsby-plugin-mdx"](https://www.gatsbyjs.com/docs/working-with-images-in-markdown/#using-the-mdx-plugin)
  що також підтримує .md файли за умови відповідних налаштувань
- Routing в проекті здійснено з використанням
  ["gatsby-node.js"](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/#using-gatsby-nodejs)
  та
  ["create-pages"](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages)

## Стилі з Tailwind CSS

- Стилізацію здійснено з допомогою [Tailwind CSS](https://tailwindcss.com), як
  [підключити](https://tailwindcss.com/docs/guides/gatsby) до Gatsby

## Адмінпанель Netlify CMS

- Контроль контенту здійснюється через
  [Netlify CMS](https://www.netlifycms.org/docs/add-to-your-site/) та хостинг на
  [Netlify](https://www.netlify.com/)
- Як користуватися адмінпанеллю можна переглянути [тут](README.admin.md)

## Локалізація

- Підтримка різних мов з плагіном
  ["gatsby-plugin-i18next"](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-i18next/?=i18next#install-package),
  **потрібна версія плагіну (1.2.3) для 17-ї версії React.js що використовується
  в проекті**

## Форма зворотнього зв'язку

- Для створення форми зворотнього зв'язку було використано
  ["React Hook Form"](https://react-hook-form.com/get-started/#Quickstart)
- Валідація форми за допомогою ["Yup"](https://www.npmjs.com/package/yup#api)
- Також [інструкція](https://react-hook-form.com/get-started/#SchemaValidation)
  від react hook form
- В якості лоадера слугує
  ["react-spinners"](https://www.davidhu.io/react-spinners/)
- Попередження про збій відправки форми з
  ["SweetAlert2"](https://sweetalert2.github.io/)

## Telegram API

- Потрібно створити бота з допомогою "BotFather", після того бот отримає свій
  токен який додаємо в .env файл
- Потім створюємо групу та/або додаємо в існуючу куди будуть приходити
  повідомлення по сабміту форми
- Даємо нашому боту права адміністратора групи
- Використовуючи арі запрос отримуємо ID нашої групи що також додаємо в .env
  файл
- Відео приклад як робитит [тут](https://www.youtube.com/watch?v=R4RhgBJpXSQ)
- [Посібник](https://tlgrm.ru/docs/bots/api) з Bot API
- Для відправки повідомлення з форми зворотнього зв'язку використано
  ["axios"](https://axios-http.com/ru/docs/intro) метод post

```bash
const data = await axios.post(TelegramUrl, {
  text,
  parse_mod: 'HTML',
  });
```

також додано саме повідомлення (text) та метод парсингу тексту (parse_mod:
'HTML') за адресою

```bash
const TelegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}`;
```

## Функціонування сервісу зворотнього звязку через телеграм бот

- Потрібно налаштувати змінні середовища (environment variables): створюємо
  файли .env.production та .env.development в директорії проекту за зразком
  файлу .env.template , де GATSBY_TELEGRAM_BOT_ID це буде токен створеного
  телеграм-боту, а GATSBY_TELEGRAM_GROUP_ID це буде ідентифікатор чату з ботом,
  для того щоб зміни засосувалися потрібно перезапустити сервер
