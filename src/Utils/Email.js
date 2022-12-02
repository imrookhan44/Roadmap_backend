const nodemailer = require("nodemailer");

const sendMail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  const mailOptions = {
    to: email,
    subject: "Invite Link",
    html: `<p>Click on the Link: ${email} </p>`,
  };
  transporter.sendMail(mailOptions, function (error, res) {
    if (error) {
      return console.log(error);
    } else {
    }
  });
  transporter.verify((error, success) => {
    if (error) {
      return console.log(error);
    } else {
    }
  });
};

module.exports = sendMail;
