import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import activateEmailTemplate from '../emails/activateEmailTemplate';

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  // MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// 이메일 보냄
const sendEmail = async (to, url, text, subject) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });
  const { token: accessToken } = await oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  } as SMTPTransport.Options);

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to,
    subject,
    html: activateEmailTemplate(to, url),
  };

  smtpTransport.sendMail(mailOptions, (err, infos) => {
    if (err) return err;
    return infos;
  });
};

export default sendEmail;
