import { v2 as cloudinary } from 'cloudinary';
import fileUpload, { UploadedFile } from 'express-fileupload';
import {
  CloudinaryUploadImages,
  FileUploadRequestData,
} from 'interfaces/back/UploadFile';
import imgMiddleware from 'middleware/imgMiddleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { promisify } from 'util';
import removeTemp from 'utils/helpers/removeTemp';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const handler = nc<FileUploadRequestData, NextApiResponse>()
  .use(
    fileUpload({
      useTempFiles: true,
    })
  )
  .use(imgMiddleware);

export const config = {
  api: {
    // next에서는 기본으로 bodyParser가 작동되므로 false로 해준다.
    bodyParser: false,
  },
};

const uploadToCloudinaryHandler = async (
  file: UploadedFile,
  path: string
): Promise<CloudinaryUploadImages> => {
  try {
    const res = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: path,
    });
    return {
      url: res.secure_url,
      public_url: res.public_id,
    };
  } catch (error) {
    throw new Error('이미지 업로드에 실패했습니다.');
  } finally {
    removeTemp(file.tempFilePath);
  }
};

handler.post(async (req, res) => {
  try {
    const { path } = req.body;

    const files = Object.values(req.files).flat();
    const images = await Promise.all(
      files.map(async file => uploadToCloudinaryHandler(file, path))
    );
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  const imageId = req.body.public_id;
  const destroyAsync = promisify(cloudinary.uploader.destroy);

  try {
    await destroyAsync(imageId);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default handler;
