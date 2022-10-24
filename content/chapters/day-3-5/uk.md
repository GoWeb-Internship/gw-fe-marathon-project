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
        question_title: Н﻿е зʼявляється червоний + щоб вибрати шрифт, де шукати?
        description: >-
          Натисніть на `"Return to classic site"` або спробуйте
          відключити `adblock`.


          ![](/img/screen_gf.jpeg)


          ![](/img/adblock_1.jpeg)
        question_range: "4"
      - id: "1666605271180"
        question_title: Я﻿к перемогти автоформатування? Текст contacts (телефон email)
          встають в один рядок при збереженні.
        description: >-
          Спробуйте додати у
          налаштування `prettier` рядок `"htmlWhitespaceSensitivity"`: `"ignore"`,
          цей параметр можна додати у налаштування розширення `prettier`, або
          додати у файл `prettier.json`.


          [Завантажити `prettier.json`](https://faq.m.goit.global/ua/assets/fonts/download/prettier.json)
        question_range: "5"
chapter_range: "4"
---
