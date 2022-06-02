// const nodemailer = require("nodemailer");

// const sendEmail = async (body) => {
//   try {
//     var transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: `ecomercell22@gmail.com`, // generated ethereal user
//         pass: `sdmtzvaddvqtvlnz`, // generated ethereal password
//       },
//     });

//     const { email } = body;
//     console.log(email)

//     await transporter.sendMail({
//       from: `Ecomercell <ecomercell22@gmail.com>`, // sender address
//       to: email, // list of receivers
//       subject: `Estado de compra`, // Subject line
//       text: "Su paquete ha sido despachado y llegara pronto a sus manos, gracias por elegirnos.", // plain text body
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   transporter.verify().then(() => {
//     console.log("listo para enviar mails");
//   });
// };
// module.exports = { sendEmail };
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
      subject: `Purchase state`, // Subject line
      text: "Your purchase has been succefully recieved, we will be in touch to inform when the package is on the way. Thanks for being with us.", // plain text body
    });
  } catch (error) {
    console.log(error);
  }
};
const sendEmailOrderStatus = async (email) => {
  try {
    await transporter.sendMail({
      from: `Ecomercell <ecomercell22@gmail.com>`, // sender address
      to: email, // list of receivers
      subject: `Order dispatched`, // Subject line
      text: "Your package is on the way", // plain text body
    });
  } catch (error) {
    console.log(error);
  }
};

// transporter.verify().then(() => {
//   console.log("listo para enviar mails");
// });
module.exports = { sendEmail, sendEmailOrderStatus };
