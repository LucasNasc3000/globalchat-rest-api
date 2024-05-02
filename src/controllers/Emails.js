/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const sendgrid = require('@sendgrid/mail');

class EmailsController {
  async SendEmail(req, res) {
  // This sample is based off of:
  // https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

    async function sendgridExample() {
      await sendgrid.send({
        to: req.body.destinatary,
        from: 'lucasnascdev@gmail.com',
        subject: 'Sendgrid test email from Node.js on Google Cloud Platform',
        text: 'Well hello! This is a Sendgrid test email from Node.js on Google Cloud Platform.',
      });
    }
    sendgridExample();
  }
}

export default new EmailsController();
