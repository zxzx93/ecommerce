import {
  CreateSubCategoryRequestData,
  DeleteSubCategoryRequestData,
  SubCategoryResponseData,
  UpdateSubCategoryRequestData,
} from 'interfaces/back/SubCategories.interface';
import SubCategories from 'models/SubCategories';
import nc from 'next-connect';
import slugify from 'slugify';

import auth from '../../../middleware/auth';

const handler = nc();

// 하위 카테고리 생성
handler.post<CreateSubCategoryRequestData, SubCategoryResponseData>(
  async (req, res) => {
    try {
      const { name, parent } = req.body;

      const subCategoryExists = await SubCategories.findOne({ name });
      if (subCategoryExists) {
        return res.status(400).json({
          message: `이미 ${name} 카테고리명이 존재합니다. 다른 이름을 사용하세요.`,
        });
      }

      const newSubCategory = new SubCategories({
        name,
        parent,
        slug: slugify(name),
      });
      await newSubCategory.save();
      const subCategories = await SubCategories.find({}).sort({ updateAt: -1 });
      return res.status(200).json({
        message: `${name} 카테고리가 성공적으로 생성되었습니다.`,
        subCategories,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// 하위 카테고리 수정
handler.put<UpdateSubCategoryRequestData, SubCategoryResponseData>(
  async (req, res) => {
    try {
      const { id, name, parent } = req.body;

      await SubCategories.findByIdAndUpdate(
        id,
        {
          name,
          parent,
          slug: slugify(name),
        },
        { new: true }
      );
      const subCategories = await SubCategories.find({})
        .sort({ updateAt: -1 })
        .populate('parent');

      return res.status(200).json({
        message: `${name} 카테고리가 수정 되었습니다.`,
        subCategories,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// 하위 카테고리 삭제
handler.delete<DeleteSubCategoryRequestData, SubCategoryResponseData>(
  async (req, res) => {
    try {
      const { id, name } = req.body;

      await SubCategories.findByIdAndRemove(id);
      return res.status(200).json({
        message: `${name} 카테고리가 삭제 되었습니다.`,
        subCategories: await SubCategories.find({}).sort({ updateAt: -1 }),
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default auth(handler);
