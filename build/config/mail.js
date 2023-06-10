"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sendMail", {
    enumerable: true,
    get: function() {
        return sendMail;
    }
});
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function sendMail(body) {
    let transporter = _nodemailer.default.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.TO_EMAIL,
        subject: "Contact information",
        text: "Hello world?",
        html: `
    <b>Name:</b> ${body.name} <br/>
    <b>Email:</b> ${body.email} <br/>
    <b>Phone:</b> ${body.phone} <br/>
    <b>Message:</b> ${body.message} <br/>
`
    });
}
