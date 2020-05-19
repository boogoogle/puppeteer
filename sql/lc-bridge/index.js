const AV = require('leancloud-storage');
const chalk = require('chalk')
const logError = (i)=>{
  console.log(chalk.red(i))
}

AV.init({
  appId: "RLtWLCg6cdFTBWsKW9NkKkU6-gzGzoHsz",
  appKey: "1UhF681mabFDORMg8bkFTGcy",
  serverURL: "https://rltwlcg6.lc-cn-n1-shared.com"
});

const hotObjectName = "ZhihuHotObject" // 保存在lean-cloud上的对象名称

function queryByQuestionId(id){
  const Query = new AV.Query(hotObjectName)
  Query.equalTo('id', id)
  return Query.find()
}
function saveHotItem(questionObj={
  id: 0,
  url: '',
  title:''
}){
  questionObj.id = Number(questionObj.id)
  if(!questionObj.id) {
    logError("question id 不能是:", questionObj.id)
    return
  }

  queryByQuestionId(questionObj.id).then(res=>{
    if(res && res.length) {
      logError(`question${questionObj.id}已存在!!!`)
    } else {
      const ZHObj = AV.Object.extend(hotObjectName);
      const zhObj = new ZHObj();
      zhObj.set('id', questionObj.id);
      zhObj.set('url', questionObj.url);
      zhObj.set('title', questionObj.title);
      zhObj.save().then((zhObj) => {
        console.log(zhObj, '保存成功。')
      })
    }
  })
}

module.exports = {
  queryByQuestionId,
  saveHotItem
}
// lcBrdige.saveHotItem()