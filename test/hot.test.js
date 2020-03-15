const {saveHotItem, findAllItems} = require('../sql/models/hot');
const fs = require('fs');
// function test(){
//   const item = {id: '379550570',
//   url: 'https://www.zhihu.com/question/379550570?utm_division=hot_list_page',
//   title:'bbbbbbbbbb？'}
//   saveHotItem(item)
// }

// test()
(async ()=> {
  const res = await findAllItems();
  res.forEach(r=>{
    const id = r.getDataValue('id')
    fs.mkdir('../imgs/'+id,{ recursive: true }, (err)=>{
      if(err){
        throw err
      }
    })
  })
})()
