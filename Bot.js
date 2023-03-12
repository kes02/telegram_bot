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
        const pattern = /[\t\r\n\v\f]{3,}|\s{3,}/gi; //g = all i = 전체문항
        const back_pattern = /[\s\uFEFF\xA0]+$/gi;
        $bodyList.each(function(i, elem) { //동기
            ulList[i] = {
                number: $(this).find('td.b-num-box').text().replace(pattern, "").replace(back_pattern,''),
                title: $(this).find('div.b-title-box a').attr('title').replace(pattern, "").replace(/자세히 보기/gi,"").replace(back_pattern,'').replace(/,/gi, '|'), //a 태그 안에서 title 속성 갖고 있음
                url: "https://www.ajou.ac.kr/kr/ajou/notice.do" + $(this).find('div.b-title-box a').attr('href'),
                division: $(this).find('span.b-cate').text().replace(pattern, ""), //분류
                new: $(this).find('div.b-title-box div.b-etc-box p.b-new span').text(),
                writer: $(this).find('span.b-writer').text().replace(pattern, ""), //작성팀
                date: $(this).find('span.b-date').text().replace(pattern, "") //날짜
            };


            log(ulList[i])
            const infotext = JSON.stringify(ulList[i]).replace(/[\"\\{\\}]/gi, "").replace(/,/gi, "\n").replace(/[|]/gi, ',');  //대대괄호, 따음표 제거

            bot.onText(/\/New/, (msg) => {
                if(infotext.includes('NEW')){ //fix된 공지가 아닌 것만 전송 받음
                    setTimeout(() => {
                        bot.sendMessage(chatId, infotext);
                    }, i*1000); // Delay each message by 1 second
                }
            }); //bot이 /New라는 명령어를 입력 받았을 때, 해당 메시지를 입력 받았을때 출력

            bot.onText(/\/공지/, (msg) => {
                if(infotext.includes('공지')){
                    setTimeout(() => {
                        bot.sendMessage(chatId, infotext);
                    }, i*1000); // Delay each message by 1 second
                }
            }); //bot이 /공지라는 명령어를 입력 받았을 때, 해당 메시지를 입력 받았을때 출력
        });
          const data = ulList.filter(n => n.title);
          return data;
        })
        //.then(res => log(res));

// 각각의 parsing method 추가 -> string