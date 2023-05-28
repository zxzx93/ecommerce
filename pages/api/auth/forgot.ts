import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import resetEmailTemplate from '../../../emails/resetEmailTemplate';
import User from '../../../models/User';
import db from '../../../utils/helpers/db';
import sendEmail from '../../../utils/helpers/sendEmail';
import { createResetToken } from '../../../utils/helpers/tokens';

interface RequestBody {
  body: { email: string };
}

const handler = nc<
  Omit<NextApiRequest, 'body'> & RequestBody,
  NextApiResponse
>();

handler.post<RequestBody>(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '이메일이 존재하지 않습니다.' });
    }
    const userId = createResetToken({ id: user._id.toString() });
    const url = `${process.env.BASE_URL}/auth/reset/${userId}`;
    sendEmail(email, url, '', '비밀번호를 재설정하세요.', resetEmailTemplate);
    await db.disconnectDb();
    return res.json({
      message: '귀하에게 이메일이 전송되었습니다. 비밀번호를 재설정하세요.',
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default handler;
