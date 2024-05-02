"use strict";Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const sgMail = require('@sendgrid/mail');

class EmailsController {
  async SendEmail(req, res) {
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs

    sgMail.setApiKey('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');
    const msg = {
      to: req.body.destinatary, // Change to your recipient
      from: 'storagemail329@gmail.com', // Change to your verified sender
      subject: 'Testando',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<h1>Eae man blz?</h1>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

exports. default = new EmailsController();
