import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import User from '../../../models/User';
import db from '../../../utils/db';

interface RequestBody {
  body: { userId: string; password: string };
}

const handler = nc<
  Omit<NextApiRequest, 'body'> & RequestBody,
  NextApiResponse
>();

handler.put<RequestBody>(async (req, res) => {
  try {
    await db.connectDb();
    const { userId, password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: '사용자가 존재하지 않습니다.' });
    }
    const samePwd = bcrypt.compareSync(password, user.password);
    if (samePwd) {
      return res
        .status(400)
        .json({ message: '이전 비밀번호와 동일하므로 바꿀 수 없습니다.' });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptedPassword,
    });
    await db.disconnectDb();
    return res.json({
      message: '비밀번호 변경이 되었습니다. 재로그인 해주세요.',
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default handler;
