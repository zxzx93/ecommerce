import fs from 'fs';

/**
 * 임시 파일 삭제
 * @param {string} tempFilePath 임시 파일의 절대 경로
 */

export default function removeTemp(tempFilePath: string) {
  fs.unlink(tempFilePath, err => {
    if (err) {
      throw err;
    }
  });
}
