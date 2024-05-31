const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Html personalizado pendente
class EmailsController {
  SendEmail(req, res) {
    const msg = {
      to: req.body.destinatary,
      from: 'storagemail329@gmail.com',
      subject: req.body.subject,
      text: req.body.text,
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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

export default new EmailsController();
