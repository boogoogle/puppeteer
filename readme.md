### 主要第三方库
  - [puppeteer](https://www.bookstack.cn/read/puppeteer-api-zh_CN/class-Puppeteer.md)
  - [sequelize v5](https://sequelize.org/v5/manual/models-definition.html#configuration)
  - [sequelize v5 中文](https://itbilu.com/nodejs/npm/V1PExztfb.html)





### puppeteer 使用备忘
  - 等待某个dom出现后再执行[page.waitForSelector(selector[, options])](https://www.bookstack.cn/read/puppeteer-api-zh_CN/class-Page.md#page.waitForFunction(pageFunction[,%20options[,%20%E2%80%A6args]]))




### 截图
  - 对块级元素来说，offsetTop、offsetLeft、offsetWidth 及 offsetHeight 描述了元素相对于 offsetParent 的边界框。


### 创建文件夹
  ```
// 创建 /tmp/a/apple 目录，无论是否存在 /tmp 和 /tmp/a 目录。
fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
});

  ```



### 使用步骤
1. 启动docker, docker run mysql101(这是本机mysql容器)
2. node run index.js


