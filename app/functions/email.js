const nodemailer = require('nodemailer');
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
exports.sendEmailAlert = function(body) {
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'mail.nutricion.edu.uy',
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "gdarosa", // generated ethereal user
                pass: "gd.43399220", // generated ethereal password
            }
        });
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"ge 👻" <gdarosa@nutricion.edu.uy>', // sender address
            to: 'germandrq@gmail.com', // list of receivers
            subject: body, // Subject line
            text: "Arreglenme!", // plain text body
            //html: '<b>Hello world?</b>' // html body
        };

        // send mail with defined transport object

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });

    });

}