const nodemailer = require('nodemailer')

module.exports = {
 transporter: nodemailer.createTransport({ 
  host: 'server.sargentassociates.com',
  port: 587,
  secure: false,
  auth: {
        user: 'support@argosvisual.com',
        pass: 'czB2Ee123!'
  }
})
}