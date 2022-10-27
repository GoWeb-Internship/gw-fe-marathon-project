---
chapter: day-3-5
title: Day 3-5
language: en
subhead:
  - subhead_title: VSCode
    questions:
      - id: "1666860800499"
        question_title: After the command `display.flex`, the text is outside the
          document, what to do?
        description: "If you do not get the desired result now, after using `display:
          flex`, you should check the wraps and make sure that you have
          specified `display: flex` of the required class. We have `<div>` with
          the wrapper class, it `<aside> `and `<div>` with the
          `about-me-container class`, the `wrapper` class should write `display:
          flex`."
        question_range: "1"
      - id: "1666861122987"
        question_title: How can I attach a font?
        description: >-
          To attach a font, add before `</head>`:


          `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap&subset=cyrillic" rel="stylesheet">`


          ![](/img/day-3-5-1.jpg)
        question_range: "2"
      - id: "1666861295427"
        question_title: How to enter the size of the photo?
        description: |-
          In the following lessons we will set the size of the image by `css`. 

          But now you can do the following:

          `<img width="300" src="./img/photo.jpg" alt="My photo 123">`
        question_range: "3"
      - id: "1666861564071"
        question_title: There is no red `+` to choose the font, where to search?
        description: |-
          Click `"Return to classic site"` or try to disable `adblock`.

          ![](/img/screen_gf.jpeg)

          ![](/img/adblock_1.jpeg)
        question_range: "4"
      - id: "1666861726810"
        question_title: How to win autopforming? Text `contacts` (phone number and
          email)gets in the same row when it is saved.
        description: >-
          Try adding `"htmlWhitespaceSensitivity"` in the `pretier`
          configuration: "ignore", this option can be added to the `pretier`
          extension configuration, or added to the `pretier.json` file.


          Download [`prettier.json`](https://faq.m.goit.global/ua/assets/fonts/download/prettier.json)
        question_range: "5"
      - id: "1666862667586"
        question_title: How to name classes correctly?
        description: >-
          Use only Latin and write classes from a small letter.


          class="liner"- do not use cyrillic

          class="footer"- use latin only

          Class="Header"- do not use large letters in the class name (upper case)

          class="header"- use only small letters (lower case)
        question_range: "6"
      - id: "1666864206622"
        question_title: The difference in the use of the tags `<p>` and `<r>`.
        description: While (3 day of study) you are more focused on the size of the font
          when choosing a `<p>` or `<h>` tag. This is not true, but it is
          normal, considering that you are only making the first steps! It will
          be correct to think about the hierarchy of headers. If it is not a
          title, `<h...>` you do not need to use it. Can be used simply `<p>`.
          But do not need much to worry about this. This is all over time you
          will understand! You can not learn EVERYTHING for 3 days.
        question_range: "7"
      - id: "1666865716267"
        description: >-
          The difference is rather exclusively semantics:


          The `<p>` tag is for the output of a paragraph, a conscious block of text


          The `<span>` tag is used to highlight a small (1-2 words usually) part of the text, for further formatting😉


          In a chat it is impossible to expand such a big topic. If you want to look at them in more detail, we recommend you to look at them in the specifications🤓🤓🤓


          [P﻿aragraf](https://developer.mozilla.org/ru/docs/Web/HTML/Element/p)


          [Span](https://developer.mozilla.org/ru/docs/Web/HTML/Element/span)
        question_range: "8"
        question_title: W﻿hat is the difference between tegs `<span>` and `<p>`?
chapter_range: "4"
---
