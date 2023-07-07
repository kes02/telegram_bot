# telegram_bot
---
## 개요
필요한 공지사항만을 알림 받고 싶지만 기존의 아주대 앱과 메일로 불필요한 알림까지 받게 됨. 학교 홈페이지에 올라오는 공지사항만을 자동으로 정해둔 시간마다 올라온 공지사항이 있을 경우에만 알림을 받고 싶음.
이를 장시간으로 open 하기 위해 필요한 스케줄러 또는 서버 사용
---
### 개발
- 언어
  - 자바스크립트
- npm
  - node-telegram-bot-api
  - axios
  - cheerio
  - node-cron
- url
  - https://www.ajou.ac.kr/kr/ajou/notice.do

---
### 기능
공지사항 링크를 크롤링하여 필요한 공지사항만 알림을 받고 싶음

- /공지 -> fix되어 있는 공지사항만 알림
- /New -> 새롭게 올라온 공지사항만 알림
---
#### 구현예정
- /echo + 메시지 -> 수강이라는 단어가 들어간 공지사항만 알림(아직 구현X)
- 한 메소드에 묶여있음 -> 각 메소드별 함수 구분
  - getHtml() - 웹크롤링 역할
  - htmltoString() - 크롤링 해온 데이터를 형식별로 parsing한걸 String으로 변환해주는 함수
  - sendMessage() - bot에게 recieve 메시지 없이 request 메시지를 보내는 함수
---
#### 고민해야할 것
- DB 운용
- AWS 사용
- 서버 사용
- 스케줄러 사용(현재 구현)
---
#### 코드 설명
- Fix된 공지사항
  - 목록, 제목, 링크, 분류, 게시자, 날짜
- 새롭게 올라온 공지사항
  - 번호, 제목, 링크, 분류, NEW, 게시자, 날짜
  
---
### 참고 문헌
https://velog.io/@filoscoder/Node%EB%A1%9C-%EA%B0%84%EB%8B%A8%ED%95%9C-telegram-bot-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0
https://jsikim1.tistory.com/177