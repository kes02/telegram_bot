// npm 모듈 호출
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const cheerio = require('cheerio');
//const { data } = require('cheerio/lib/api/attributes');
const log = console.log;

const getHtml = async () => {
    try {
        return await axios.get("https://www.ajou.ac.kr/kr/ajou/notice.do");
    } catch (error) {
        console.error(error);
    }
};

// `botFather`가 제공한 `token`으로 API 통신에 사용한다
const token= '6150005852:AAEygUCZViVfC0SiUEY74b69sFQqPwB2ST0'; // <--- 나의 Token
const chatId = '1877133528';
// 새로운 'bot' 인스턴스를 생성해 'polling'으로 업데이트를 fetch 하게 한다
const bot = new TelegramBot(token, {polling: true});

// 몇개씩 보낼지, 공지 항목 분류, 새로운게 올라올 때마다 텔레그램봇 자동 수신
getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        //const $bodyList = $("tbody tr").children("td.b-td-left"); //tbody -> tr -> td.b-td-left
        const $bodyList = $("tbody tr"); //tbody -> tr -> td.b-td-left
        // if not tbody -> tr.b-top-box

        $bodyList.each(function(i, elem) {
            ulList[i] = {
                number: $(this).find('td.b-num-box').text().replace(/[\t\r\n\v\f\s]+/g, "").replace(/[\s\uFEFF\xA0]+$/gi,''),
                //title: $(this).find('div.b-title-box a').text().replace(/[\t\r\n\v\f]+/g, "").replace("[공지]",""), //a 태그 안에서 title 속성 갖고 있음
                title: $(this).find('div.b-title-box a').attr('title').replace(/[\t\r\n\v\f]+/g, "").replace(/자세히 보기/gi,"").replace(/[\s\uFEFF\xA0]+$/gi,''), //a 태그 안에서 title 속성 갖고 있음
                url: "https://www.ajou.ac.kr/kr/ajou/notice.do" + $(this).find('div.b-title-box a').attr('href'),
                division: $(this).find('span.b-cate').text().replace(/[\t\r\n\v\f]+/g, ""), //분류
                writer: $(this).find('span.b-writer').text().replace(/[\t\r\n\v\f]+/g, ""), //작성팀
                date: $(this).find('span.b-date').text().replace(/[\t\r\n\v\f]+/g, "") //날짜
                //image_url: $(this).find('p.poto a img').attr('src'),
                //image_alt: $(this).find('p.poto a img').attr('alt'),
                //summary: $(this).find('p.lead').text().slice(0, -11),  
            };
            //.chtext = String(ulList[i])
            //const chtext = JSON.stringify(ulList[i], null, '\n').replace(/,$/g, "\n");
            //const chtext = JSON.stringify(ulList[i], null, '\n').replace(/[\"\\{\\}]/gi, "");  //대대괄호, 따음표 제거
            //const chtext = JSON.stringify(ulList[i], null, '\n').replace(/[\t\r\n\v\f]{3,}|\s{3,}/g, "|").split("|");
            bot.sendMessage(chatId, chtext);
          });
      
          const data = ulList.filter(n => n.title);
          
          return data;
        })
        .then(res => {
            log(res)
            
        });
        

// 정규식으로 '/echo'를 판별하고 그 뒤에 어떤 메시지든 'msg'에 담는다
// bot.onText(/\/echo (.+)/, (msg, match) => {   
//     const chatId = msg.chat.id;
//     const resp = "꺄악: "+match[1]; 
//     // 식별된 "msg"는 보내온 채팅방('chatId')에게 앵무새처럼 재전송한다 ("꺄악: 'msg'")
//     bot.sendMessage(chatId, resp);
//  });

//  bot.on('message', (msg) => {
//      const chatId = msg.chat.id;
    
//      // send a message to the chat acknowledging receipt of their message
//      bot.sendMessage(chatId, 'Received your message');
// });

// 정규식으로 '/a'를 판별하고 그 뒤에 어떤 메시지든 'msg'에 담는다
// bot.onText(\/a\  => {   
//     chatId = '1877133528';

    


//     bot.sendMessage(chatId, data);
//  });

//  bot.on('message', (msg) => {
//      const chatId = msg.chat.id;
    
//      // send a message to the chat acknowledging receipt of their message
//      bot.sendMessage(chatId, 'Received your message');
// });