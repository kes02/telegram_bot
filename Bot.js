// npm 모듈 호출
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;

const getHtml = async () => {
    try {
        return await axios.get("https://www.ajou.ac.kr/kr/ajou/notice.do");
    } catch (error) {
        console.error(error);
    }
};

const token = '6150005852:AAEygUCZViVfC0SiUEY74b69sFQqPwB2ST0'; 
const chatId = '1877133528';

const bot = new TelegramBot(token, {polling: true});

// 몇개씩 보낼지, 공지 항목 분류, 새로운게 올라올 때마다 텔레그램봇 자동 수신
getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("tbody tr"); //tbody -> tr -> td.b-td-left
        // if not tbody -> tr.b-top-box
        const pattern = /[\t\r\n\v\f]+/g;
        const back_pattern = /[\s\uFEFF\xA0]+$/gi;
        $bodyList.each(function(i, elem) { //동기
            ulList[i] = {
                number: $(this).find('td.b-num-box').text().replace(pattern, "").replace(back_pattern,''),
                title: $(this).find('div.b-title-box a').attr('title').replace(pattern, "").replace(/자세히 보기/gi,"").replace(back_pattern,'').replace(/,/gi, '|'), //a 태그 안에서 title 속성 갖고 있음
                url: "https://www.ajou.ac.kr/kr/ajou/notice.do" + $(this).find('div.b-title-box a').attr('href'),
                division: $(this).find('span.b-cate').text().replace(pattern, ""), //분류
                writer: $(this).find('span.b-writer').text().replace(pattern, ""), //작성팀
                date: $(this).find('span.b-date').text().replace(pattern, "") //날짜
            };
            const chtext = JSON.stringify(ulList[i]).replace(/[\"\\{\\}]/gi, "").replace(/,/gi, "\n").replace(/[|]/gi, ',');  //대대괄호, 따음표 제거
            setTimeout(() => {
                bot.sendMessage(chatId, chtext);
            }, i*1000); // Delay each message by 1 second

        });
          const data = ulList.filter(n => n.title);
          return data;
        })
        .then(res => log(res));