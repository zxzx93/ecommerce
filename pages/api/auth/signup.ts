import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import activateEmailTemplate from '../../../emails/activateEmailTemplate';
import User from '../../../models/User';
import db from '../../../utils/helpers/db';
import sendEmail from '../../../utils/helpers/sendEmail';
import { createActivationToken } from '../../../utils/helpers/tokens';
import validateEmail from '../../../utils/validation/EmailValidation';

interface RequestBody {
  body: { name: string; email: string; password: string };
}

const handler = nc<
  Omit<NextApiRequest, 'body'> & RequestBody,
  NextApiResponse
>();

handler.post<RequestBody>(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: '이메일, 이름, 패스워드를 제대로 입력해주세요.' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: '유효한 이메일이 아닙니다.' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: '이미 가입되어 있는 이메일이 있습니다.' });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: '비밀번호는 8자 이상이어야 합니다.' });
    }
    const cyrptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, name, password: cyrptedPassword });
    const addedUser = await newUser.save();
    const token = createActivationToken({ id: addedUser._id.toString() });

    const url = `${process.env.BASE_URL}/activate/${token}`;
    sendEmail(email, url, '', '계정을 활성화하세요.', activateEmailTemplate);
    await db.disconnectDb();
    return res.json({
      message: `회원가입이 완료되어 메인페이지로 이동합니다.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
