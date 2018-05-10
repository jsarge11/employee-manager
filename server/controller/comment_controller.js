const preset = require('./mailer_preset')
const nodemailer = require('nodemailer')

module.exports = {
 submit: (req, res) => {
  let { comment, email } = req.body.payload;
  let mailOptions = {
   from: `<${email}>`,
   to: `support@argosvisual.com`,
   subject: `Comment Box Submission`,
   html: `${email} has provided the following comment / question:
   ${comment}`
  }
  preset.transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
    res.status(500).send('failure')
    return console.log(error);
   }
   res.status(200).send('success');

  })
 },

}