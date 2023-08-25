import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { ManageAddressRequestData } from '../../../interfaces/back/User.interface';
import { Address } from '../../../interfaces/front/User.interface';
import auth from '../../../middleware/auth';
import User from '../../../models/User';
import db from '../../../utils/helpers/db';

const handler = nc<ManageAddressRequestData, NextApiResponse>();

// 주소 기본배송지 수정
handler.put(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.body;
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) {
      db.disconnectDb();
      return res.status(404).json({ message: '사용자를 찾을 수 없음' });
    }

    const userAddress = user?.address as Address[];

    // user의 address 배열을 수정
    if (userAddress) {
      user.address = userAddress.map(address => {
        const isActive = address._id.toString() === id;
        return { ...address, active: isActive };
      });
    }

    await User.findByIdAndUpdate(
      userId,
      { address: user.address },
      { new: true }
    );

    return res.status(200).json({
      message: '기본배송지가 변경되었습니다.',
      data: user.address,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

// 주소 삭제
handler.delete(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.body;
    const userId = req.user;

    // $pull:특정 조건을 만족하는 항목을 제거
    // address 필드에 있는 주소 객체 중 _id 가 주어진 id와 일치하는 객체를 찾아 제거
    const deleteAddress = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          address: { _id: id },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: '주소가 삭제되었습니다.',
      data: deleteAddress?.address,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

export default auth(handler);
