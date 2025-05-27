const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2) Define the email options
   const mailOptions = {
        from: `Signalez <${process.env.EMAIL_USERNAME}>`, // Use EMAIL_USERNAME instead
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
};

    // 3) Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;