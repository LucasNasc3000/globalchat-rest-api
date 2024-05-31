const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailsController {
  SendEmail(req, res) {
    const msg = {
      to: 'storagemail329@gmail.com', // Change to your recipient
      from: req.body.destinatary, // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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
