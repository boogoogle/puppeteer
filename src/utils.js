const qs = require('querystring');
class Utils{
    isQuestion(url){
        return url.indexOf('question') > -1
    }
    isSpecial(url){
        return !this.isQuestion(url) && url.indexOf('billboard') < 0
    }
    parseQuestionNumber(url){
        const regexp = /question\/\d+/
        const u = url.match(regexp)
        if(!Array.isArray(u) || !u.length) {
            console.log(url + ':--> 不是question链接, 跳过')
            return ''
        }
        const p = u[0] // 'question/378458788', 因为列表中可能有special/34847855这种主题内容
        return p.split('/') [1]
    }
    parseAnswerNumber(url){
        const regexp = /answer\/\d+/
        const p = url.match(regexp)[0] // 'question/378458788', 因为列表中可能有special/34847855这种主题内容
        return p.split('/') [1]
    }
}
let utils = new Utils()

module.exports = utils