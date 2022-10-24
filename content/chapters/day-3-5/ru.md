---
chapter: day-3-5
title: День 3-5
language: ru
subhead:
  - subhead_title: VSCode
    questions:
      - question_title: "Что делать, если после команды `display: flex` текст вылетает
          за границы документа?"
        description: "Если у вас сейчас не получается получить желаемый результат, после
          применения `display: flex`, значит, нужно проверить и убедиться, что
          вы указали `display: flex` нужному классу. У нас есть `<div>` с
          классом `wrapper`, в нем `<aside>` и `<div>` с
          классом `about-me-container`, классу `wrapper` нужно
          написать `display: flex`."
        question_range: "1"
        id: "1666359906569"
      - question_title: Как подключить шрифт?
        description: >-
          Чтобы подключить шрифт, добавьте перед `</head>`:


          `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap&subset=cyrillic" rel="stylesheet">`


          ![как подключить шрифт](/img/day-3-5-1.jpg "как подключить шрифт")
        question_range: "2"
        id: "1666359906679"
      - id: "1666612042945"
        question_title: К﻿ак правильно задать размер фото?
        description: >-
          В следующих уроках через `css` мы будем задавать размер изображению.
          Но пока что можно сделать так:


          `<img width="300" src="./img/photo.jpg" alt="My photo 123">`
        question_range: "3"
      - id: "1666612098136"
        question_title: Ч﻿то делать, если не появляется красный `+`, чтобы выбрать шрифт?
        description: >-
          Нажмите на `"Return to classic site"` или попробуйте
          отключить `adblock`.


          ![](/img/screen_gf.jpeg)


          ![](/img/adblock_1.jpeg)
        question_range: "4"
      - id: "1666612422135"
        question_title: К﻿ак не допустить автоформатирование? Текст под `contacts
          `(телефон и email) становиться в одну строку при форматировании.
        description: >-
          Попробуйте добавить в
          настройки `prettier` строку `"htmlWhitespaceSensitivity"`: `"ignore"`,
          этот параметр можно внести в настройках расширения `prettier`, или
          внести в файл `prettier.json`.


          [Скачать `prettier.json`](https://faq.m.goit.global/ua-ru/assets/fonts/download/prettier.json)
        question_range: "5"
      - id: "1666612529020"
        question_title: К﻿ак правильно именовать классы?
        description: >-
          

          Используйте только латиницу и пишите классы с маленькой буквы.


          *  `class="футер"`- не используйте кириллицу

          *  `class="footer"`- используйте только латиницу

          *  `class="Header"`- не используйте большие буквы в названии класса (верхний регистр)

          *  `class="header"`- используйте только маленькие буквы (нижний регистр)
        question_range: "6"
chapter_range: "4"
---
