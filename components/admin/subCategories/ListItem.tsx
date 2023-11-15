import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import useToast from 'hooks/useToast';
import { ICategories } from 'interfaces/back/Categories.interface';
import {
  ISubCategories,
  SubCategoryResponseData,
} from 'interfaces/back/SubCategories.interface';
import { InferType, object, string } from 'yup';

import styles from './styles.module.scss';

interface ListItemProps {
  categories: ICategories[];
  subCategory: ISubCategories;
  setSubCategories: (newCategories: ISubCategories[]) => void;
}

const SubCategorySchema = object({
  name: string()
    .required('카테고리명을 입력해주세요.')
    .min(2, '최소 2글자 이상 입력해주세요.')
    .max(30, '최대 30글자 이하로 입력해주세요.')
    .matches(
      /^[a-zA-Z\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]*$/,
      '영어 알파벳, 공백, 특수문자만 입력할 수 있습니다.'
    ),
  parent: string().required('부모 카테고리명을 입력해주세요.'),
});
export type SubCategoryData = InferType<typeof SubCategorySchema>;

function ListItem({
  categories,
  subCategory,
  setSubCategories,
}: ListItemProps) {
  const { toastSuccess, toastError } = useToast();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SubCategoryData>({
    defaultValues: {
      name: subCategory.name,
      parent: subCategory.parent._id,
    },
    resolver: yupResolver(SubCategorySchema),
  });

  const name = watch('name');

  const handleActionSuccess = (data: SubCategoryResponseData) => {
    setSubCategories(data.subCategories);
    setOpen(false);
    toastSuccess(data.message);
  };

  const handleRequest = async (method: 'put' | 'delete', value: object) => {
    try {
      const { data } = await axios[method]('/api/admin/subCategory', value);
      handleActionSuccess(data);
    } catch (error) {
      toastError(error);
    }
  };

  const handleUpdate = handleSubmit(data => {
    handleRequest('put', {
      id: subCategory._id,
      name: data.name,
      parent: data.parent,
    });
  });

  const handleRemove = () => {
    handleRequest('delete', {
      data: { id: subCategory._id, name: subCategory.name },
    });
  };

  const closeForm = () => {
    reset({ parent: subCategory.parent._id });
    setOpen(false);
  };

  return (
    <form onSubmit={handleUpdate}>
      <li className={styles.list__item}>
        <input
          className={open ? styles.open : ''}
          type='text'
          disabled={!open}
          value={name || subCategory.name}
          {...register('name')}
        />
        {open && (
          <div className={styles.list__item_expand}>
            <select
              className={styles.select}
              disabled={!open}
              {...register('parent')}
            >
              {categories.map(option => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            <button className={styles.btn} type='submit'>
              저장
            </button>
            <button className={styles.btn} onClick={closeForm}>
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
