"use strict";Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const sendgrid = require('@sendgrid/mail');

class EmailsController {
  SendEmail(req, res) {
    // This sample is based off of:
    // https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail
    sendgrid.setApiKey('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');

    async function sendgridExample() {
      await sendgrid.send({
        to: req.body.destinatary,
        from: 'storagemail329@gmail.com',
        subject: 'Sendgrid test email from Node.js on Google Cloud Platform',
        text: 'Well hello! This is a Sendgrid test email from Node.js on Google Cloud Platform.',
      });
    }
    sendgridExample();
  }
}

exports. default = new EmailsController();
