import {
  CategoryResponseData,
  CreateCategoryRequestData,
  DeleteCategoryRequestData,
  UpdateCategoryRequestData,
} from 'interfaces/back/Categories.interface';
import Categories from 'models/Categories';
import nc from 'next-connect';
import slugify from 'slugify';

import auth from '../../../middleware/auth';

const handler = nc();

// 카테고리 생성
handler.post<CreateCategoryRequestData, CategoryResponseData>(
  async (req, res) => {
    try {
      const { name } = req.body;

      const categoryExists = await Categories.findOne({ name });
      if (categoryExists) {
        return res.status(400).json({
          message: `이미 ${name} 카테고리명이 존재합니다. 다른 이름을 사용하세요.`,
        });
      }

      const newCategory = new Categories({ name, slug: slugify(name) });
      await newCategory.save();
      const categories = await Categories.find({}).sort({ updateAt: -1 });
      return res.status(200).json({
        message: `${name} 카테고리가 성공적으로 생성되었습니다.`,
        categories,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// 카테고리 수정
handler.put<UpdateCategoryRequestData, CategoryResponseData>(
  async (req, res) => {
    try {
      const { id, name } = req.body;

      await Categories.findByIdAndUpdate(id, { name, slug: slugify(name) });
      return res.status(200).json({
        message: `${name} 카테고리가 수정 되었습니다.`,
        categories: await Categories.find({}).sort({ updateAt: -1 }),
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// 카테고리 삭제
handler.delete<DeleteCategoryRequestData, CategoryResponseData>(
  async (req, res) => {
    try {
      const { id, name } = req.body;

      await Categories.findByIdAndRemove(id);
      return res.status(200).json({
        message: `${name} 카테고리가 삭제 되었습니다.`,
        categories: await Categories.find({}).sort({ updateAt: -1 }),
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default auth(handler);
