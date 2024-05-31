"use strict";Object.defineProperty(exports, "__esModule", {value: true});const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailsController {
  SendEmail(req, res) {
    const msg = {
      to: req.body.destinatary, // Change to your recipient
      from: 'storagemail329@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: req.body.text,
    };

    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
        res.json('Email enviado');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

exports. default = new EmailsController();
