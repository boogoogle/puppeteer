/**
 * 通过方位billboard,拿到移动端的热搜列表,
 * 列表中的问题id做了base64加密,解密出来也可使用
 * 此处提供另一种思路
 * puppteer点击列表页中的每一个页面标题,打开对应详情页面,在详情页的url中获取问题id
 * 获取后就可以拼接详情页面,然后从详情页面爬取对应的详情数据了
 */

const fs = require('fs');
const puppeteer = require('puppeteer');
const utils = require('./src/utils');
const { saveHotItem } = require("./sql/models/hot");
const questionIdArray = [];
const billboard = 'https://www.zhihu.com/billboard';
let currentPage = null;
let items = [];
let currentIndex = 0; // 已记录地址的热榜项目索引值
let objList = [];
let currentQuesObj = {};
let specialNum = 0;
let questionNum = 0;
(async () => {
  const browser = await puppeteer.launch({
    // headless: false, // 关闭无头模式
    ignoreHTTPSErrors: true,
    // dumpio: true, // 将浏览器进程标准输出和标准错误输入到 process.stdout 和 process.stderr 中
    timeout: 0,//等待浏览器实例启动的最长时间（以毫秒为单位）。默认是 30000 (30 秒). 通过 0 来禁用超时。
  })
      browser.on('targetchanged', async(target)=>{
        // console.log(Object.keys(target.page()))
        // await currentPage.waitFor(2000)
        const url = target._targetInfo.url
        // console.log(url)
        if(utils.isQuestion(url)){
          const questionId = utils.parseQuestionNumber(url)
          // console.log(currentIndex,target._targetInfo)
          if(questionIdArray.indexOf(questionId === -1)) {
            questionIdArray.push(questionId)
            currentQuesObj.id = questionId
            currentQuesObj.url = 'https://www.zhihu.com/question/' + questionId
            try{
              saveHotItem(currentQuesObj) // 数据入库
              console.log('after savetoId')
              fs.mkdir('./imgs/'+questionId, (e)=>{console.error(e)})// 创建对应的图片文件夹
              objList.push(currentQuesObj)
              currentIndex += 1
              questionNum += 1
              currentQuesObj = {}
              // await currentPage.close()
              getQuestionIdFromBillboard(); 
            } catch (err) {
              console.error('err------>',err)
              browser.close();
            } 
          }
        }
        if(utils.isSpecial(url)){
            currentIndex += 1
            specialNum +=1
            currentQuesObj = {}
            await currentPage.close()
            getQuestionIdFromBillboard(); 
        }
      })
      async function getQuestionIdFromBillboard(){
        currentPage = await browser.newPage()
        await currentPage.goto(billboard,{ // 在billboard拿不到questionId,所以只能每次都从billboard点击每个问题
          timeout: 0
        })
        items = await currentPage.$$('.App-main .HotList-item') // 拿到所有该类名的元素
        console.log(items.length, currentIndex)
        if(!items[currentIndex]) {
          console.log('---热榜扫描结束, 共',questionNum, '条热搜---', specialNum,'条special链接')
          browser.close()
          return
        }
        const st = await items[currentIndex].$eval('.HotList-itemTitle',s=>{ // 使用$eval 获取dom元素,并拿到想要的内容
          return s.textContent
        })
        currentQuesObj.title=st;
        await items[currentIndex].click()
      }
      getQuestionIdFromBillboard()

      
      
      // fs.writeFile('./zhihu_billboard.txt', s, (res)=>{
      //     console.log(res, 'callback')
      // })

      
      //输入账号密码
      // const username = await page.$('.SignFlow-tabs');
      // console.log(username)
      // await uniqueIdElement.type('admin@admin.com', {delay: 20});
      // const passwordElement = await page.$('#password', {delay: 20});
      // await passwordElement.type('123456');
      // //点击确定按钮进行登录
      // let okButtonElement = await page.$('#btn-ok');
      // //等待页面跳转完成，一般点击某个按钮需要跳转时，都需要等待 page.waitForNavigation() 执行完毕才表示跳转成功
      // await Promise.all([
      //     okButtonElement.click(),
      //     page.waitForNavigation()  
      // ]);
      // console.log('admin 登录成功');
      // await browser.close()
})()
