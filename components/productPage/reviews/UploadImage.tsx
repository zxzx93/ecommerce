import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MdOutlineRemoveCircle } from 'react-icons/md';

import { ImageFile } from '../../../interfaces/front/Review.interface';

import styles from './styles.module.scss';

interface UploadImageProps {
  imageFile: ImageFile[];
  setImageFile: Dispatch<SetStateAction<ImageFile[]>>;
}

function UploadImage({ imageFile, setImageFile }: UploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(''); // input 요소의 값
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
        setInputValue('');
      }, 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [error]);

  const uploadImageshandle = (e: ChangeEvent<HTMLInputElement>) => {
    let uploadFile = Array.from(e.target.files || []);

    const isValidImage = (img: File) =>
      ['image/jpeg', 'image/webp', 'image/png'].includes(img.type) &&
      img.size <= 1024 * 1024 * 5; // 형식체크, 5MB 사이즈 초과

    const imagesLeft = 3 - imageFile.length;
    uploadFile = uploadFile
      .filter(img => isValidImage(img))
      .slice(0, imagesLeft);

    uploadFile.forEach(img => {
      setError('');
      // 같은 이미지 추가 중복 금지
      if (!imageFile.some(image => image.name === img.name)) {
        const reader = new FileReader();
        reader.onload = () =>
          setImageFile(prevImages => [
            ...prevImages,
            { name: img.name, url: reader.result as string },
          ]);
        reader.readAsDataURL(img);
        setInputValue('');
      } else {
        setError('이미 추가된 이미지입니다.');
      }
    });

    if (e.target.files && e.target.files.length > 0 && imagesLeft < 1) {
      setError('최대 3개까지 업로드 가능합니다.');
    }
    if (e.target.files && !Array.from(e.target.files).every(isValidImage)) {
      if (Array.from(e.target.files).some(img => img.size > 1024 * 1024 * 5)) {
        setError('5MB를 초과한 이미지가 첨부 되었습니다.');
      } else {
        setError('jpeg,png,webp 이미지 파일만 업로드 가능합니다.');
      }
    }
  };

  const removeImage = (image: ImageFile) => {
    setImageFile(prevImages =>
      prevImages.filter(img => img.name !== image.name)
    );
  };

  return (
    <div className={styles.images}>
      <input
        type='file'
        ref={inputRef}
        value={inputValue}
        onChange={uploadImageshandle}
        accept='image/png,image/jpeg,image/webp'
        multiple
        hidden
      />
      <button
        className={styles.submit_btn}
        onClick={() => inputRef.current?.click()}
        style={{ width: '150px' }}
      >
        이미지 첨부
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.images_wrap}>
        {imageFile.length > 0 &&
          imageFile.map((img, i) => (
            <span>
              <MdOutlineRemoveCircle onClick={() => removeImage(img)} />
              <img src={img.url} alt={`업로드 이미지${i}`} />
            </span>
          ))}
      </div>
    </div>
  );
}

export default UploadImage;
