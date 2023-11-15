import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import useToast from 'hooks/useToast';
import {
  CategoryResponseData,
  ICategories,
} from 'interfaces/back/Categories.interface';
import { InferType, object, string } from 'yup';

import styles from './styles.module.scss';

interface ListItemProps {
  category: ICategories;
  setCategories: (newCategories: ICategories[]) => void;
}

const CategorySchema = object({
  name: string()
    .required('카테고리명을 입력해주세요.')
    .min(2, '최소 2글자 이상 입력해주세요.')
    .max(30, '최대 30글자 이하로 입력해주세요.')
    .matches(
      /^[a-zA-Z\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]*$/,
      '영어 알파벳, 공백, 특수문자만 입력할 수 있습니다.'
    ),
});
export type CategoryData = InferType<typeof CategorySchema>;

function ListItem({ category, setCategories }: ListItemProps) {
  const { toastSuccess, toastError } = useToast();
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm<CategoryData>({
    defaultValues: {
      name: category.name,
    },
    resolver: yupResolver(CategorySchema),
  });

  useEffect(() => {
    setValue('name', category.name);
  }, [category, setValue]);

  const handleActionSuccess = (data: CategoryResponseData) => {
    setCategories(data.categories);
    setOpen(false);
    toastSuccess(data.message);
  };

  const handleRequest = async (method: 'put' | 'delete', value: object) => {
    try {
      const { data } = await axios[method]('/api/admin/category', value);
      handleActionSuccess(data);
    } catch (error) {
      toastError(error);
    }
  };

  const handleUpdate = handleSubmit((data: CategoryData) => {
    handleRequest('put', { id: category._id, name: data.name });
  });

  const handleRemove = () => {
    handleRequest('delete', {
      data: { id: category._id, name: category.name },
    });
  };

  const closeForm = () => {
    setOpen(false);
    reset({ name: category.name });
  };

  return (
    <form onSubmit={handleUpdate}>
      <li className={styles.list__item}>
        <input
          className={open ? styles.open : ''}
          type='text'
          disabled={!open}
          {...register('name')}
        />
        {open && (
          <div className={styles.list__item_expand}>
            <button className={styles.btn} type='submit'>
              저장
            </button>
            <button className={styles.btn} type='button' onClick={closeForm}>
              취소
            </button>
          </div>
        )}
        <div className={styles.list__item_actions}>
          {!open && <AiTwotoneEdit onClick={() => setOpen(prev => !prev)} />}
          <AiFillDelete onClick={handleRemove} />
        </div>
      </li>

      {errors.name && (
        <div className={styles.error}>
          <ErrorMessage name='name' errors={errors} />
        </div>
      )}
    </form>
  );
}

export default ListItem;
