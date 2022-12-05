const nodemailer = require("nodemailer");

const sendMail = async (email, id) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  const mailOptions = {
    to: email,
    subject: "You have been invited to collaborate on a roadmap",
    html: `<h1>Click on the link to join the board</h1>
      <a href="https://roadmap2k22.netlify.app/#/roadmaps/${id}">Join Board</a>`
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
