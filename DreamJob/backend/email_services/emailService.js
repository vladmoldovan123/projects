const nodemailer = require("nodemailer");
const credentials = require("./email_credentials");
const constants = require("../utils/constants");

const confirmationUrl=constants.frontendUrl+'/account?confirmationCode=';
const resetPasswordUrl= constants.frontendUrl+'/reset-password?token=';

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: credentials.email,
        pass: credentials.password,
    },
});

module.exports.sendConfirmationEmail = (name, email, subject, confirmationCode) => {
    transport.sendMail({
        from: credentials.email,
        to: email,
        subject: subject,
        html: `<h1>Email de confirmare</h1>
        <h2>Salut ${name}</h2>
        <p>Multumim pentru înregistrare. Vă rugăm să confirmați contul apăsând pe link-ul de mai jos.</p>
        <a href=${confirmationUrl+confirmationCode}> Confirmă cont</a>
        </div>`,
    }).catch(err => console.log(err));
};

module.exports.sendResetPasswordEmail = (name, email, subject, passwordToken) => {
    transport.sendMail({
        from: credentials.email,
        to: email,
        subject: subject,
        html: `<h1>Resetare parola</h1>
        <h2>Buna ziua, ${name}!</h2>
        <p>Pentru a reseta parola accesati link-ul de mai jos.</p>
        <a href=${resetPasswordUrl+passwordToken}> Reseteaza parola</a>
        </div>`,
    }).catch(err => console.log(err));
};

// module.exports.sendConfirmationEmail = (name, email, subject) => {
//     transport.sendMail({
//         from: credentials.email,
//         to: email,
//         subject: subject,
//         html: `<h1>Email de confirmare</h1>
//         <h2>Salut ${name}</h2>
//         <p>Multumim pentru înregistrare. Vă rugăm să confirmați contul apăsând pe link-ul de mai jos.</p>
//         <a href=${confirmationUrl+confirmationCode}> Confirmă cont</a>
//         </div>`,
//     }).catch(err => console.log(err));
// };

module.exports.sendMessageNotification = (nameFrom,name, email, subject) => {
    transport.sendMail({
        from: credentials.email,
        to: email,
        subject: subject,
        html: `<h1>Notificare</h1>
        <h2>Salut ${name}</h2>
        <p>Ai primit un nou mesaj de la ${nameFrom}.</p>
        </div>`,
    }).catch(err => console.log(err));
};