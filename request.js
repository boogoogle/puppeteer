const puppeteer = require('puppeteer');
const fs = require('fs');
const url = require("url");
const link = "http://localhost/b/";
(async () => {
  const browser = await puppeteer.launch({
      headless: false, // 关闭无头模式
      ignoreHTTPSErrors: true,
      // dumpio: true, // 将浏览器进程标准输出和标准错误输入到 process.stdout 和 process.stderr 中
      timeout: 0,//等待浏览器实例启动的最长时间（以毫秒为单位）。默认是 30000 (30 秒). 通过 0 来禁用超时。
  })

  const page = await browser.newPage()
  

  // page.on('request',req => {
  //   console.log(req.url(), '----')
  // })

  page.on('response',async resp => {
    const link = resp.url();
    const linkObj = url.parse(link)

    console.log(linkObj)



    const req = await resp.request()

    const type = await req.resourceType()

    const h = resp.headers()

  })


  await page.goto(link,{
      timeout: 0
  })

  
  console.log('<<<<<<<<< end')
  // await page.close();
})()