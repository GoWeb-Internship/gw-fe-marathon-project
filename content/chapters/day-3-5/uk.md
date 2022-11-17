---
chapter: day-3-5
title: День 3-5
language: uk
subhead:
  - subhead_title: VSCode
    questions:
      - question_title: "Після команди `display: flex` текст вилітає за межі документа,
          що робити?"
        description: "Якщо у вас зараз не виходить отримати бажаний результат, після
          застосування `display: flex`, значить, потрібно перевірити обгортки і
          переконатися, що ви вказали `display: flex` потрібному класу. У нас
          є `<div>` з класом `wrapper`, в ньому `<aside>` і `<div>` з
          класом `about-me-container`, класу `wrapper` потрібно
          написати `display: flex`."
        question_range: "1"
        id: "1666359791541"
      - question_title: Я﻿к підключити шрифт?
        description: >-
          Для того, щоб підключити шрифт, додайте перед `</head>`:


          `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap&subset=cyrillic" rel="stylesheet">`


          ![як підключити шрифт](/img/day-3-5-1.jpg "як підключити шрифт")
        question_range: "2"
        id: "1666359791633"
      - question_title: Як задати розмір фотографії?
        description: >-
          На наступних уроках через `css` ми будемо задавати розмір зображення.
          Але зараз можна зробити так:


          `<img width="300" src="./img/photo.jpg" alt="My photo 123">`
        question_range: "3"
        id: "1666359791680"
      - id: "1666605015050"
        question_title: Н﻿е зʼявляється червоний `+` щоб вибрати шрифт, де шукати?
        description: >-
          Натисніть на `"Return to classic site"` або спробуйте
          відключити `adblock`.


          ![як повернутись до класичного сайту](/img/screen_gf.jpeg "як повернутись до класичного сайту")


          ![як відключити adblock](/img/adblock_1.jpeg "як відключити adblock")
        question_range: "4"
      - id: "1666605271180"
        question_title: Я﻿к перемогти автоформатування? Текст `contacts` (телефон email)
          встають в один рядок при збереженні.
        description: "Спробуйте додати у
          налаштування `prettier` рядок `\"htmlWhitespaceSensitivity\"`: `\"ign\
          ore\"`, цей параметр можна додати у налаштування
          розширення `prettier`, або додати у файл `prettier.json`.


          <a
          href=\"https://faq.m.goit.global/ua/assets/fonts/download/prettier.js\
          on\" target=\"_blank\" rel=\"noopener noreferrer nofollow\"
          download>\r

          \        Завантажити `prettier.json`\r

          \      </a>"
        question_range: "5"
      - id: "1666605791401"
        question_title: Я﻿к правильно іменувати класи?
        description: >-
          

          Використовуйте тільки латиницю і пишіть класи з маленької літери.


          *  `class="футер"`- не використовуйте кирилицю

          *  `class="footer"`- використовуйте тільки латиницю

          *  `class="Header"`- не використовуйте великі літери в назві класу (верхній регістр)

          *  `class="header"`- використовуйте тільки маленькі букви (нижній регист)
        question_range: "6"
      - id: "1666605866770"
        question_title: Р﻿ізниця у використанні тегів `<p>`та `<h>`.
        description: Поки (3 день навчання) при виборі тега `<p>` або `<h>` Ви більше
          орієнтуєтеся на розмір шрифту. Це не вірно, але нормально, враховуючи,
          що ви робите лише перші кроки! Правильно буде продумувати ієрархію
          заголовків. Якщо це не заголовок, то і `<h...>` використовувати не
          потрібно. Можемо використовувати просто `<p>`. Але не потрібно сильно
          переживати з цього приводу. Це все з часом ви зрозумієте! Не можна
          дізнатися ВСЕ за 3 дні.
        question_range: "7"
      - id: "1666606174339"
        question_title: Ч﻿им відрізняються теги `<p>` та `<span>`
        description: >-
          Різниця скоріше виключно семантична:


          1. Тег `<p>` - це для виводу абзацу, свідомого блоку тексту

          2. Тег `<span>` - для виділення невеликої (1-2 слова зазвичай) частини тексту, для подальшого їх форматування, наприклад 😉


          У чаті неможливо розгорнути таку велику тему. Якщо ви хочете розібратись більш детально, то радимо заглянути, що про них пишуть у специфікаціях 🤓🤓🤓


          [Параграф](https://developer.mozilla.org/ru/docs/Web/HTML/Element/p)


          [Span](https://developer.mozilla.org/ru/docs/Web/HTML/Element/span)
        question_range: "8"
chapter_range: "4"
---
