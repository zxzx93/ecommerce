import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import useToast from 'hooks/useToast';
import { ICategories } from 'interfaces/back/Categories.interface';
import { InferType, object, string } from 'yup';

import AdminInput from 'components/inputs/adminInput/AdminInput';

import styles from './styles.module.scss';

const CategorySchema = object({
  name: string()
    .required('카테고리명을 입력해주세요.')
    .min(2, '최소 2글자 이상 입력해주세요.')
    .max(30, '최대 30글자 이하로 입력해주세요.')
    .matches(/^[a-zA-Z\s]*$/, '숫자 및 특수문자는 허용되지 않습니다.'),
});
export type CategoryData = InferType<typeof CategorySchema>;

interface CreateProps {
  setCategories: (newCategories: ICategories[]) => void;
}

function Create({ setCategories }: CreateProps) {
  const { toastSuccess, toastError } = useToast();

  const formMethods = useForm<CategoryData>({
    resolver: yupResolver(CategorySchema),
  });
  const { handleSubmit, setValue } = formMethods;

  const createCategoryHandler = async ({ name }: { name: string }) => {
    try {
      const { data } = await axios.post('/api/admin/category', { name });
      setCategories(data.categories);
      setValue('name', '');
      toastSuccess(data.message);
    } catch (error) {
      setValue('name', '');
      toastError(error);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(createCategoryHandler)}>
        <div className={styles.header}>카테고리 생성</div>
        <AdminInput type='text' label='카테고리명' name='name' />

        <div className={styles.btnWrap}>
          <button
            className={`${styles.btn} ${styles.btn__primary}`}
            type='submit'
          >
            <span>추가</span>
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Create;
