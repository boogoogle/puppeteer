const chalk = require('chalk');

module.exports = {
    logError : (...args) => console.log(chalk.red(args)),
    logInfo : (...args) => console.log(chalk.green(args)),
    log: {
        yellow: (...args) => console.log(chalk.yellow(args)),
        blue: (...args) => console.log(chalk.blue(args)),
    }
}

// const l =  ()=>{
//     console.log(args)
//     console.log(chalk.red(args))
// }

// l(11,2,3)