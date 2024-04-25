"use strict";Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable import/no-extraneous-dependencies */
var _nodemailer = require('nodemailer');

class EmailsController {
  async SendEmail(req, res) {
    try {
      const transporter = _nodemailer.createTransport.call(void 0, {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
      });

      const mailOptions = {
        from: req.body.emailFrom,
        to: req.body.destinatary,
        subject: 'Nodemailer Project',
        text: 'Hi from your nodemailer project',
      };

      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(`Error ${err}`);
        } else {
          console.log('Email sent successfully');
          console.log(data);
        }
      });
      return res.json('Email enviado com sucesso');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new EmailsController();
