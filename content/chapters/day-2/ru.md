---
chapter: day-2
title: День 2
language: ru
subhead:
  - subhead_title: Общие вопросы
    questions:
      - question_title: Д﻿ля чего нужен `normalize.css`?
        description: Он обеспечивает для `HTML` - элементов лучшую кроссбраузерность в
          стилях по умолчанию.
        question_range: "1"
        id: "1666359887575"
      - id: "1666611653634"
        question_title: К﻿ак сделать комментарий?
        description: |-
          Нажмите `ctrl + /`

          ![к﻿ак сделать комментарий](/img/giphy.gif "к﻿ак сделать комментарий")

          [via GIPHY](https://giphy.com/gifs/Vbzq0GcG0CY2PNGeQq)
        question_range: "2"
  - subhead_title: VSCode
    questions:
      - question_title: При сохранении редактируется /форматируется `index.html`. Что делать?
        description: >-
          Если установлен плагин Prettier и есть файл
          настроек [`prettier.json`](https://faq.m.goit.global/ua-ru/assets/fonts/download/prettier.json)


          Простое решение:


          ![настройка prettier.json](/img/day2-1.jpg "настройка prettier.json")


          Также можно отключить форматирование:


          ![как отключить форматирование](/img/day2-2.jpg "как отключить форматирование")
        question_range: "1"
        id: "1666359887677"
      - id: "1666611733866"
        question_title: К﻿ак уменьшить отступ выделяя строки, как на видео 2 урока?
        description: |-
          Нужно нажать `shift+tab`.

          ![как уменьшить отступ](/img/giphy-1-.gif "как уменьшить отступ")
        question_range: "2"
      - id: "1666611845307"
        question_title: П﻿очему не отображается `<img>`?
        description: >-
          Проверьте, правильна ли у Вас иерархия папок. В папке `project` должны
          быть:


          * – файл `index.html`,

          * – папка `img` (в ней изображение `photo.jpg`),

          * – папка `css` (в ней в дальнейшем будет файл со стилями),

            ![иерархия папок](/img/day2_scren-img.jpeg "иерархия папок")

            в таком случае в `index.html` пишем: `<img src="./img/photo.jpg" alt="my photo">`

            ![как написать тег img](/img/day2_scren1-img.jpeg "как написать тег img")

            – в названиях папок и файлов у нас нет кириллицы, пробелов и заглавных букв.
        question_range: "3"
chapter_range: "3"
---
