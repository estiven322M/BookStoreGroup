const { Options } = require("blockly");
const nodemailer=require("nodemailer")

const sendEmail= async option=>{
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "34f4c35e86fcdb",
          pass: "7d9579795241a2"
        }
      });
      const mensaje={
      from:"BookStoreGroup <bookstore@group.com",
      to:Options.email,
      subject:options.subject,
      text:options.mensaje
      }
      await transport.sendMail(mensaje)
}

module.exports=sendEmail;