const nodeMailer = require("nodemailer");

const sendMail = async (options) =>{

    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD

        },
    });
    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
        
    };

   await transporter.sendMail(mailOptions);
};

module.exports = sendMail;