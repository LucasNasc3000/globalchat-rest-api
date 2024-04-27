/* eslint-disable import/no-extraneous-dependencies */
const mailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');

class EmailsController {
  async SendEmail(req, res) {
    async function mailjet() {
      const transport = mailer.createTransport(
        smtp({
          host: 'in.mailjet.com',
          port: 587,
          auth: {
            user: process.env.MAILJET_API_KEY,
            pass: process.env.MAILJET_API_SECRET,
          },
        }),
      );

      const json = await transport.sendMail({
        from: req.body.from,
        to: req.body.destinatary,
        subject: 'test email from Node.js on Google Cloud Platform',
        text: 'Hello!\n\nThis a test email from Node.js.',
        html: '<h1>Opa, tudo bom?<h1/>',
      });
      console.log(json);
      res.json({ json });
    }
    mailjet();
  }
}

export default new EmailsController();
