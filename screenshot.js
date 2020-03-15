const puppeteer = require('puppeteer');
const {findAllItems} = require('./sql/models/hot');
const {parseQuestionNumber,parseAnswerNumber} = require('./src/utils')
const url = 'https://www.zhihu.com/question/378458788/answer/1071475998';


(async () => {
    const browser = await puppeteer.launch({
        headless: false, // 关闭无头模式
        ignoreHTTPSErrors: true,
        // dumpio: true, // 将浏览器进程标准输出和标准错误输入到 process.stdout 和 process.stderr 中
        timeout: 0,//等待浏览器实例启动的最长时间（以毫秒为单位）。默认是 30000 (30 秒). 通过 0 来禁用超时。
    })

    const questionArray = await findAllItems();

    // questionArray.forEach(r=>{
        const r = questionArray[0]
        const url = r.getDataValue('url')
        openQuestionPage(browser, url)
        // fs.mkdir('../imgs/'+id,{ recursive: true }, (err)=>{
        // if(err){
        //     throw err
        // }
        // })
    // })  
})()

async function openQuestionPage(browser,url){
    console.log('question的url是:..........',url)
    const page = await browser.newPage()
    await page.goto(url,{
        timeout: 0
    })
    await page.evaluate(() => {
        const se = document.scrollingElement || document.body.scrollingElement;
        const bodyH = document.body.offsetHeight
        se.scrollTop = bodyH
    })

    // 拿到每条回答的列表
    const listItems = await page.$$('.List-item')
    listItems.forEach(async li=>{
        const answerUrl = await li.$eval('.AnswerItem > meta[itemprop=url]', s=>s.content)
        console.log('当前回答的url是:............'+answerUrl)
        shotOneAnswer(browser, answerUrl)
        page.close()
    })
    
}

async function shotOneAnswer(browser, url){
    const questionId = parseQuestionNumber(url)
    const answerId = parseAnswerNumber(url)
    const imagePath = './imgs/' + questionId + '/' + answerId + '.jpg'
    console.log(imagePath)
    const page = await browser.newPage()
    await page.goto(url,{
        timeout: 0
    })
    const ele = await page.$('.QuestionAnswer-content')
    await page.setViewport({
        width: 1080,
        height: 1000
    })
    const b = await ele.boundingBox()
    // page.evaluate(() => {
    //     const se = document.scrollingElement || document.body.scrollingElement;
    //     se.scrollTop = ""
    // })
    await page.setViewport({
        width: 1080,
        height: b.height + b.y
    })

    await page.screenshot({
        path: imagePath,
        // fullPage:true,
        clip: b
    })
    console.log(b)
    page.close();
}
