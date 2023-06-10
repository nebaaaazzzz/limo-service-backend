import nodemailer from "nodemailer";

export async function sendMail(body: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, //
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: process.env.TO_EMAIL, // list of receivers
    subject: "Contact information", // Subject line
    text: "Hello world?", // plain text body
    html: `
    <b>Name:</b> ${body.name} <br/>
    <b>Email:</b> ${body.email} <br/>
    <b>Phone:</b> ${body.phone} <br/>
    <b>Message:</b> ${body.message} <br/>
`, // html body
  });
}
