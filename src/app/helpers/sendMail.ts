import { transport } from '../../config/nodemailer';
import { email } from '../../config/nodemailer';

const getHtml = () => {
    return `
        <h1 style="color:blue;font-size:14px">Testando se o envio de email funciona!</h1>
    `;
};

export const sendMail = async (emailTo: string, subject: string, text: string) => {
    const mailOptions = {
        from: email,
        to: emailTo,
        subject,
        text: text,
        html: getHtml(),
    };

    await transport.sendMail(mailOptions);

    return {
        message: 'Email sent successfully'
    };
};
