import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import useToast from 'hooks/useToast';
import { ICategories } from 'interfaces/back/Categories.interface';
import { ISubCategories } from 'interfaces/back/SubCategories.interface';
import { InferType, object, string } from 'yup';

import AdminInput from 'components/inputs/adminInput/AdminInput';
import SingularSelect from 'components/selects/SingularSelect';

import styles from './styles.module.scss';

const subCategorySchema = object({
  name: string()
    .required('카테고리명을 입력해주세요.')
    .min(2, '최소 2글자 이상 입력해주세요.')
    .max(30, '최대 30글자 이하로 입력해주세요.')
    .matches(
      /^[a-zA-Z\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]*$/,
      '영어 알파벳, 공백, 특수문자만 입력할 수 있습니다.'
    ),
  parent: string().required('부모 카테고리명을 선택해주세요.'),
});
export type SubCategoryData = InferType<typeof subCategorySchema>;

interface CreateProps {
  categories: ICategories[];
  setSubCategories: (newCategories: ISubCategories[]) => void;
}

function Create({ categories, setSubCategories }: CreateProps) {
  const { toastSuccess, toastError } = useToast();

  const formMethods = useForm<SubCategoryData>({
    resolver: yupResolver(subCategorySchema),
  });
  const { handleSubmit, setValue } = formMethods;

  const postSubCategory = async (data: SubCategoryData) => {
    const response = await axios.post('/api/admin/subCategory', data);
    return response.data;
  };

  const createSubCategoryHandler = async (data: SubCategoryData) => {
    try {
      const response = await postSubCategory(data);
      setSubCategories(response.subCategories);
      toastSuccess(response.message);
    } catch (error) {
      toastError(error);
    } finally {
      setValue('name', '');
      setValue('parent', '');
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(createSubCategoryHandler)}>
        <div className={styles.header}>하위 카테고리 생성</div>
        <AdminInput type='text' label='카테고리명' name='name' />
        <SingularSelect name='parent' parentCategories={categories} />
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
