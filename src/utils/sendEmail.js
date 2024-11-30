import nodemailer from 'nodemailer';
import {env} from "./env.js";

const transporter = nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port: env("SMTP_PORT"),
    secure: false,
    auth: {
        user: env("SMTP_LOGIN"),
        pass: env("SMTP_PASSWORD"),
    }
});

export const sendEmail = async (email, jwt) => {
    const info = await transporter.sendMail({
        from: env("SMTP_FROM"),
        to: email,
        subject: "Welcome to SMTP!",
        html: `<div><a href=${env("HOST")}/reset-pwd/?token=${jwt}>Click here to reset password</a></div>`
    });

    console.log(info);
};