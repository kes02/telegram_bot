// npm 모듈 호출
const TelegramBot = require('node-telegram-bot-api');

// `botFather`가 제공한 `token`으로 API 통신에 사용한다
const token= '6150005852:AAEygUCZViVfC0SiUEY74b69sFQqPwB2ST0'; // <--- 나의 Token

// 새로운 'bot' 인스턴스를 생성해 'polling'으로 업데이트를 fetch 하게 한다
const bot = new TelegramBot(token, {polling: true});

// 정규식으로 '/echo'를 판별하고 그 뒤에 어떤 메시지든 'msg'에 담는다
bot.onText(/\/echo (.+)/, (msg, match) => {   
    const chatId = msg.chat.id;
    const resp = "꺄악: "+match[1]; 
    // 식별된 "msg"는 보내온 채팅방('chatId')에게 앵무새처럼 재전송한다 ("꺄악: 'msg'")
    bot.sendMessage(chatId, resp);
 });

 bot.on('message', (msg) => {
     const chatId = msg.chat.id;
    
     // send a message to the chat acknowledging receipt of their message
     bot.sendMessage(chatId, 'Received your message');
   });