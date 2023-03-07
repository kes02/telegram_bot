# telegram_bot
---
##개요
필요한 공지사항만을 알림 받고 싶지만 기존의 아주대 앱과 메일로 불필요한 알림까지 받게 됨. 학교 홈페이지에 올라오는 공지사항만을 자동으로 정해둔 시간마다 올라온 공지사항이 있을 경우에만 알림을 받고 싶음.

---
### 개발
- 언어
  - 자바스크립트
- npm
  - node-telegram-bot-api
  - axios
  - cheerio
- url
  - https://www.ajou.ac.kr/kr/ajou/notice.do

---
### 기능
공지사항 링크를 크롤링하여 필요한 공지사항만 알림을 받고 싶음

- /공지 -> fix되어 있는 공지사항만 알림
- /전체공지 -> fix되어 있는 공지사항을 제외한 것만 알림
- /echo + 메시지 -> 수강이라는 단어가 들어간 공지사항만 알림을 받음

---
### 참고 문헌
https://velog.io/@filoscoder/Node%EB%A1%9C-%EA%B0%84%EB%8B%A8%ED%95%9C-telegram-bot-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0
