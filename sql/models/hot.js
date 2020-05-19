const Sequelize = require('sequelize');
const sequelize = require('../connect_sql');
const Model = Sequelize.Model;
class HotItem extends Model {}

HotItem.init({
  // attributes
  count_id: {
    type: Sequelize.INTEGER,
    primaryKey: true, 
    autoIncrement: true
  },
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  title: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'hotList',
  // tableName: 'hot',
  timestamps: false,
  freezeTableName: true, // 默认会给表名加复数s
  // options
});

// HotItem.sync()

async function saveHotItem(item={
    id: 0,
    url: '',
    title: ''
}){
    /* 若存在,返回对象,不存在返回null */
    const question = await HotItem.findOne({where: {id: item.id}})
    if(question && question.id) { // 
      // if(question.title !== item.title) {
      //   item.title = question.title + '|>>|' + item.title
      //   HotItem.update(item, {
      //     where: {
      //       id:item.id
      //     },
      //     fields: ['title']
      //   })
      // }
      console.log('问题已存在, 不再重复写入', item.title)
    } else {
      HotItem.create(item).then(ht=>{ // 这里用upsert不大合适
        console.info('success', ht.title)
      }).catch(e=>{
        console.error(e)
      })
    }
    
}
async function findAllItems() {
  return HotItem.findAll({
    attributes: ['url']
  })
}


module.exports = {
    saveHotItem ,
    findAllItems
}