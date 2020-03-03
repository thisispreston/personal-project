const chalk = require("chalk");

module.exports = (req, res, next) => {
  console.log(chalk.red('hit checkCus'))
  if(req.session.customer) {
      return res.status(200).send(req.session.customer)
  } else {
      next()
  }
}