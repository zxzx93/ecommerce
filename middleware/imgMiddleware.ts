import { NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { FileUploadRequestData } from 'interfaces/back/UploadFile';
import { NextApiResponse } from 'next';
import removeTemp from 'utils/helpers/removeTemp';

const isValidFile = (file: UploadedFile) => {
  const validMimeTypes = ['image/png', 'image/jpeg', 'image/webp'];
  const maxSize = 1024 * 1024 * 10; // 10MB

  if (!validMimeTypes.includes(file.mimetype)) {
    throw new Error('파일의 형식은 png, jpeg, webp만 업로드 가능합니다.');
  }

  if (file.size > maxSize) {
    throw new Error(
      '파일의 사이즈가 너무 큽니다. 10mb 이하만 업로드 가능합니다.'
    );
  }
};

const imgMiddleware = (
  req: FileUploadRequestData,
  res: NextApiResponse,
  next: NextFunction
) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: '파일을 업로드 해주세요.' });
    }
    const files = Object.values(req.files).flat();
    const allFilesAreValid = files.every(file => {
      try {
        isValidFile(file);
        return true;
      } catch (error) {
        files.forEach(f => removeTemp(f.tempFilePath));
        res.status(400).json({ message: error.message });
        return false;
      }
    });
    if (allFilesAreValid) next();
  } catch (error) {
    Object.values(req.files)
      .flat()
      .forEach(file => removeTemp(file.tempFilePath));

    return res.status(500).json({ message: 'Internal server error' });
  }
  return undefined;
};

export default imgMiddleware;
