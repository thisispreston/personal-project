require('dotenv').config()
const chalk = require("chalk")
const nodemailer = require('nodemailer')
const {EMAIL, PASSWORD} = process.env

module.exports = {
  sendEmail: (req, res) => {
    console.log(chalk.blue('hit sendEmail'))
    const {id} = req.params
    const { email, username } = req.body

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    })

    let emailText = `
      Hello ${username}, 

      Thank you for your purchase! Your order number is ${id} and will be shipped within the next twenty-four hours. We will send you another email as soon as your order is placed in the mail.

      Thank you for supporting our art, 

      Best Regards, 
      Artsy Fartsy
      `

    let mailOptions = {
        from: EMAIL,
        to: email,
        subject: `Order #${id} Confirmation`,
        text: emailText
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.status(500).send('Error Occurred')
        } else {
            res.status(200).send('Message Sent!')
        }
    })
  },
}