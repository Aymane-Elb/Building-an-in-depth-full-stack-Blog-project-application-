// src/backend/utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1) Create a transporter
    // You can use a more robust service like SendGrid, Mailgun, or configure SMTP directly
    // For Gmail, enable "App passwords" in your Google Account security settings
    // and use that password here, not your regular Gmail password.
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // e.g., 'gmail', 'SendGrid', 'Mailgun'
        auth: {
            user: process.env.EMAIL_USERNAME, // Your email address
            pass: process.env.EMAIL_PASSWORD  // Your email password or App Password
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: `<span class="math-inline">\{process\.env\.FROM\_NAME\} <</span>{process.env.FROM_EMAIL}>`, // e.g., 'Urban Signalez Support <support@urbainsignalez.com>'
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html // You can also send HTML emails if desired
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;