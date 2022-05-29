const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: `ecomercell22@gmail.com`, // generated ethereal user
    pass: `sdmtzvaddvqtvlnz`, // generated ethereal password
  },
});

const sendEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: `Ecomercell <ecomercell22@gmail.com>`, // sender address
      to: email, // list of receivers
      subject: `Estado de compra`, // Subject line
      text: "Su paquete a sido despachado y llegara pronto a sus manos, gracias por elegirnos.", // plain text body
    });
  } catch (error) {
    console.log(error);
  }
};
transporter.verify().then(() => {
  console.log("listo para enviar mails");
});
module.exports = { sendEmail };
