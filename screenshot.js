const puppeteer = require('puppeteer');
const {findAllItems} = require('./sql/models/hot');
const {parseQuestionNumber,parseAnswerNumber} = require('./src/utils')
const url = 'https://www.zhihu.com/question/378458788/answer/1071475998';
const {logError, logInfo, log} = require('./logger');

const constant = {
    openedBrowserNum: 0,
    closedBrowserNum: 0
}
(async () => {
    const browser = await puppeteer.launch({
        // headless: false, // 关闭无头模式
        ignoreHTTPSErrors: true,
        // dumpio: true, // 将浏览器进程标准输出和标准错误输入到 process.stdout 和 process.stderr 中
        timeout: 0,//等待浏览器实例启动的最长时间（以毫秒为单位）。默认是 30000 (30 秒). 通过 0 来禁用超时。
    })

    const questionArray = await findAllItems();

    const twenty = questionArray.splice(0, 40)

    twenty.forEach(r=>{
        // const r = questionArray[0]
        const url = r.getDataValue('url')
        collectAnswerWithSingleBrowser(url)
        // fs.mkdir('../imgs/'+id,{ recursive: true }, (err)=>{
        // if(err){
        //     throw err
        // }
        // })
    })  
})()

async function collectAnswerWithSingleBrowser(url){
    const browser = await puppeteer.launch({
        // headless: false, // 关闭无头模式
        ignoreHTTPSErrors: true,
        // dumpio: true, // 将浏览器进程标准输出和标准错误输入到 process.stdout 和 process.stderr 中
        timeout: 0,//等待浏览器实例启动的最长时间（以毫秒为单位）。默认是 30000 (30 秒). 通过 0 来禁用超时。
    })
    constant.openedBrowserNum += 1
    browser.on('targetdestroyed', async(target) => {
        const pages = await browser.pages()
        logInfo("pages.length -> ", pages.length)
        if(!pages || pages.length <= 2) {
            browser.close()
            constant.closedBrowserNum += 1
            constant.openedBrowserNum -= 1
            logConstant()
        }

    })
    openQuestionPage(browser, url)
}
function logConstant(){
    log.blue(`已打开${constant.openedBrowserNum}个浏览器`)
    log.blue(`已回收${constant.closedBrowserNum}个浏览器`)
}


async function openQuestionPage(browser,url){
    try{
        const page = await browser.newPage()
        await page.goto(url,{
            timeout: 0
        })
        await page.evaluate(() => {
            const se = document.scrollingElement || document.body.scrollingElement;
            const bodyH = document.body.offsetHeight
            se.scrollTop = bodyH * 2
        })

        // 拿到每条回答的列表
        const listItems = await page.$$('.List-item')
        log.yellow("listItems.length ->",listItems.length )
        log.yellow("url ->", url)
        listItems.forEach(async li=>{
            try {
                const meta = await li.$('.AnswerItem > meta[itemprop=url]')
                if(!meta)return;
                const jsHandle =await meta.getProperty('content') // 返回一个jsHandle,需要调用下一行的jsonValue方法拿到其值
                const answerUrl = await jsHandle.jsonValue()
                shotOneAnswer(browser, answerUrl)
            } catch (err) {
                logError('---------err-----------',url)
                logError(err)
                logError('---------err-----------',answerUrl)
            }
            
        })
        // page.close()
    }catch(err){
    } 
}

async function shotOneAnswer(browser, url){
    // logError('-----answerUrl-------',url)
    // return
    const questionId = parseQuestionNumber(url)
    const answerId = parseAnswerNumber(url)
    const imagePath = './imgs/' + questionId + '/' + answerId + '.jpg'
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
        height: Math.ceil(b.height + b.y)
    })

    await page.screenshot({
        path: imagePath,
        // fullPage:true,
        clip: b
    })
    page.close();
}

module.exports = {
    collectAnswerWithSingleBrowser
}
