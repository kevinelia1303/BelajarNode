const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // replace with your email
            pass: 'your-email-password'   // replace with your email password
        }
    });

    // Setup email data
    let mailOptions = {
        from: 'your-email@gmail.com', // sender address
        to: to,                       // list of receivers
        subject: subject,             // Subject line
        text: text                    // plain text body
    };

    // Send mail with defined transport object
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email: %s', error);
    }
}

module.exports = { sendEmail };