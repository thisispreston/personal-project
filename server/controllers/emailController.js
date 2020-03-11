require('dotenv').config()
const nodemailer = require('nodemailer')
const {EMAIL, PASSWORD} = process.env

module.exports = {
  sendEmail: (req, res) => {
    const {id} = req.params
    const { email, username } = req.body

    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    })

    let emailText = `Hello ${firstName}, here is the link to sign in: ${signUpURL}`
    // Step 2
    let mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Update Certification',
        text: emailText
    }

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.status(500).send('Error Occurred')
        } else {
            res.status(200).send('Message Sent!')
        }
    })
  },
}