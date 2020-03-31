const puppeteer = require('puppeteer');
const fs = require('fs');
const url = require("url");
const link = "https://www.xingzuo.com/suanming/tarotzhanbu.html";

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
    // const linkObj = url.parse(link)
    const req = await resp.request()
    // const h = resp.headers()
    const type = await req.resourceType()
    if(type === 'image') {
      const fileName = parseFileName(link)
      const imagePath = './imgs/' + fileName
      const responseBuffer = await resp.buffer()
      if (fs.existsSync(imagePath)) {
        // console.log('文件已存在', imagePath, "跳过重复创建");
      } else {
        fs.writeFileSync(imagePath, responseBuffer ,(err)=>{
          console.log(err, 'file write error')
        })
      }
    }
  })

  await page.goto(link,{
      timeout: 0
  })
  console.log('<<<<<<<<< End <<<<<<<<<<')
  // await page.close();
})()


// 解析文件名,针对js,css,jpg等文件
function parseFileName(link){
  // link 举例,对于更复杂的链接后期再补充
  // let link = 'https://www.xingzuo.com/content/images/tlpzb/paixing20.png'
  const arr = link.split('/')
  return arr[arr.length -1]
}