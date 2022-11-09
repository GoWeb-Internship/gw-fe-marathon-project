# Послідовність створення проєкту ⚙️

[🔙 Повернутися до головної сторінки](README.md)

Зміст:

- [Gatsby](#gatsby)
- [Стилі з Tailwind CSS](#tailwind-css)
- [Адмінпанель Netlify CMS](#netlify-cms)
- [Локалізація](#locales)
- [Програмне створення сторінок](#programmatic-page-creation)
- [Форма зворотнього зв'язку](#feedback-form)
- [Telegram API](#telegram-api)
- [Функціонування сервісу зворотнього зв'язку через телеграм-бот](#feedback-service-with-telegram-bot)

## Gatsby

- [Загальний туторіал по Gatsby.js](https://www.gatsbyjs.com/docs/tutorial/)
  Обов'язково ознайомитись!!!

- Контент проекту написаний на основі
  [Markdown](https://gist.github.com/Jekins/2bf2d0638163f1294637), файлів з
  розширенням .md. Плагіном для їх обробки слугує
  ["gatsby-transformer-remark"](https://www.gatsbyjs.com/docs/working-with-images-in-markdown/#using-the-transformer-remark-plugin)

- Офіційний туторіал Gatsby на момент створення проекту вже використовує .mdx
  файли та плагін
  ["gatsby-plugin-mdx"](https://www.gatsbyjs.com/docs/working-with-images-in-markdown/#using-the-mdx-plugin)
  що також підтримує .md файли за умови відповідних налаштувань.

## Tailwind CSS

## Стилізація з Tailwind CSS

Стилізацію здійснено з допомогою [Tailwind CSS](https://tailwindcss.com).
[Як підключити до Gatsby](https://tailwindcss.com/docs/guides/gatsby)

## Netlify CMS

## Адмін-панель з Netlify CMS

Контроль контенту здійснюється через
[Netlify CMS](https://www.netlifycms.org/docs/add-to-your-site/) та хостинг на
[Netlify](https://www.netlify.com/)

[Як налаштувати генератор сайтів Gatsby під Netlify CMS](https://www.gatsbyjs.com/docs/how-to/sourcing-data/sourcing-from-netlify-cms/)

Щоб отримати унікальний ідентифікатор для кожного питання, при цьому не
навантажуючи цією функцією адміністратора, було створено спеціальний віджет для
адмін-панелі. Він має назву id, а його вихідний код розміщений у папці utils.

В момент створення в адмін-панелі запитання він автоматично додає для нього id
поле у форматі unix-часу, яке приховане від адміністратора.

[Інструкція з користування адмінпанеллю проєкту](README.admin.md)

## Locales

## Локалізація

Підтримка різних мов здійснена за допомогою плагіна
["gatsby-plugin-i18next"](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-i18next/?=i18next#install-package).

Необхідно встановити версію нижче: **npm i gatsby-plugin-react-i18next@1.2.3**

У файлі **gatsby-config** вносимо налаштування. Приклад:

```bash
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`uk`, `en`, `ru`],
        defaultLanguage: `uk`,
        generateDefaultLanguagePage: '/uk',
        siteUrl: ``,

        i18nextOptions: {
          lng: 'uk',
          load: 'currentOnly',

          interpolation: {
            escapeValue: false,
          },

          keySeparator: false,
          nsSeparator: true,
        },
      },
    },
```

Створюємо і наповнюємо структуру даних, які не залежать від CMS.

```bash
|-- locales
    |-- en
        |-- translation.json
    |-- uk
        |-- translation.json
    |-- ru
        |-- translation.json
```

На кожну сторінку потрібно добавити запит `graphql`

```bash
export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
```

Для зміни мови пишемо компонент, наприклад `SwitchLang`.

Плагін на кожну сторінку добавляє контекст `language`, який ми використовуємо
для конкретизації запитів в `graphql`. Таким чином, використовуючи фільтр, ми
"звужуємо" пошук і здійснюємо локалізацію даних, які нам приходять з СMS.

## Programmatic page creation

## Програмне створення сторінок

Routing в проекті здійснено з використанням
["gatsby-node.js"](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/#using-gatsby-nodejs)
та
["create-pages"](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages)

Домашня сторінка (індекс) налаштована на відображення інформації дня start на
шлях "/".

Інші сторінки даного проєкту були створені програмним способом із використанням
gatsby-node.js.
[Інструкція Gatsby](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs)

Даним методом створюються сторінки для усіх днів, окрім стартового, саме тому у
запиті в файлі gatsby-node.js додано фільтр, який виключає папку start із масиву
запитів:

```bash
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { chapter: { ne: "start" } } }) {
        nodes {
          frontmatter {
            chapter
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.nodes.forEach(node => {
    const { chapter } = node.frontmatter;
    createPage({
      path: `/${chapter}`,
      component: path.resolve('./src/templates/day.js'),
    });
  });
};
```

Метод createPage дозволяє створити сторінку для кожного елемента масиву, який
був отриманий із запиту. У component опції потрібно вказати шлях до шаблонного
компоненту, на основі якого створюється сторінка.

## Feedback Form

## Форма зворотнього зв'язку

Для створення форми зворотнього зв'язку було використано:

- ["React Hook Form"](https://react-hook-form.com/get-started/#Quickstart)
- Валідацію форми за допомогою ["Yup"](https://www.npmjs.com/package/yup#api)
- Також [інструкція](https://react-hook-form.com/get-started/#SchemaValidation)
  від react hook form
- В якості лоадера слугує
  ["react-spinners"](https://www.davidhu.io/react-spinners/)
- Попередження про збій відправки форми з
  ["SweetAlert2"](https://sweetalert2.github.io/)

## Telegram API

Потрібно створити бота з допомогою "BotFather", після того бот отримає свій
токен який додаємо в .env файл. Потім створюємо групу та/або додаємо в існуючу,
куди будуть приходити повідомлення після відправки форми.

Даємо нашому боту права адміністратора групи. Використовуючи арі запит,
отримуємо ID нашої групи, який також додаємо в .env файл.

Для відправки повідомлення з форми зворотнього зв'язку було використано
["axios"](https://axios-http.com/ru/docs/intro), метод post.

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

- Відео приклад як виконувати
  [тут](https://www.youtube.com/watch?v=R4RhgBJpXSQ).
- [Посібник](https://tlgrm.ru/docs/bots/api) з Bot API.

## Feedback service with Telegram-bot.

## Функціонування сервісу зворотнього зв'язку через телеграм-бот

- Потрібно налаштувати змінні середовища
  ([environment variables](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/)):
  створюємо файли .env.production та .env.development в директорії проекту за
  зразком файлу .env.template , де GATSBY_TELEGRAM_BOT_ID це буде токен
  створеного телеграм-боту, а GATSBY_TELEGRAM_GROUP_ID це буде ідентифікатор
  чату з ботом, для того щоб зміни засосувалися потрібно перезапустити сервер

  ***

# Корисні посилання

- Gatsby.js [Документація](https://www.gatsbyjs.com/docs/)

- Netlify CMS На даний момент для роботи Netlify Cms необхідна версія 17 React і
  React-dom. [Docs для Gatsby](https://www.netlifycms.org/docs/gatsby/)
  [Netlify CMS, підключення, налаштування](https://www.netlifycms.org/docs/gatsby/#enable-identity-and-git-gateway)

  ***

[🔙 Повернутися до головної сторінки](README.md)
