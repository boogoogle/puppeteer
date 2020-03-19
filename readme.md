### 主要第三方库
  - puppeteer
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


### 交易
  - 庄家
  - 散户
    - 恐慌的散户
      - 风吹草动  
        - 一有利好就买入并持有
        - 一点利空就止盈或割肉
    - 拿得住的散户
      - 钱不多,买了就拿着,可能持有一两年,等到回本的时候
        - 继续持有,因为两年都涨上来了,现在涨了,那就再等等, 结果就丢失了解套机会
        - 回本了,因为对这支股票磨没了信心,果断卖出解套

止盈止损策略:
  - 适当的止盈止损除了保证现金安全外
  - 还能释放流动性,及时的进行其他投资的的买入
  - 10日均线减仓, 30日均线清仓