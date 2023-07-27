import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { SaveAddressRequestData } from '../../../interfaces/User.interface';
import auth from '../../../middleware/auth';
import User from '../../../models/User';
import db from '../../../utils/helpers/db';

const handler = nc<SaveAddressRequestData, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { address } = req.body;
    const userId = req.user;

    const saveAddress = await User.findByIdAndUpdate(
      userId, // 사용자 ID
      { $push: { address } }, // 주소를 배열에 추가합니다.
      { new: true } // 업데이트된 사용자 정보 반환
    );

    db.disconnectDb();
    return res
      .status(200)
      .json({ message: '주소가 저장되었습니다.', data: saveAddress?.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default auth(handler);
