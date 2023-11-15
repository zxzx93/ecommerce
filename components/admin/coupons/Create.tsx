import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import useToast from 'hooks/useToast';
import { ICoupon } from 'interfaces/back/Coupon.interface';
import { InferType, number, object, string } from 'yup';

import AdminInput from 'components/inputs/adminInput/AdminInput';

import styles from './styles.module.scss';

const CouponSchema = object({
  name: string()
    .required('쿠폰명을 입력해주세요.')
    .min(2, '쿠폰 이름은 2~20자 사이여야 합니다')
    .max(30, '쿠폰 이름은 2~20자 사이여야 합니다')
    .matches(/^[a-zA-Z0-9]*$/, '한글 및 특수문자는 허용되지 않습니다.'),
  discount: number()
    .required('할인율을 입력해주세요.')
    .min(1, '할인율은 1% 이상이어야 합니다.')
    .max(99, '할인율은 99% 이하여야 합니다'),
});
export type CouponData = InferType<typeof CouponSchema>;

interface CreateProps {
  setCoupons: (newCoupons: ICoupon[]) => void;
}

function Create({ setCoupons }: CreateProps) {
  const { toastSuccess, toastError } = useToast();

  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');
  const [selectedDate, setSelectedDate] = useState({
    startDate: today,
    endDate: tomorrow,
  });

  useEffect(() => {
    setSelectedDate(prev => ({
      ...prev,
      endDate: dayjs(prev.startDate).add(1, 'day') || dayjs(prev.endDate),
    }));
  }, [selectedDate.startDate]);

  const formMethods = useForm<CouponData>({
    resolver: yupResolver(CouponSchema),
  });
  const { handleSubmit, reset } = formMethods;

  const createCouponHandler = async ({ name, discount }: CouponData) => {
    try {
      const { data } = await axios.post('/api/admin/coupon', {
        coupon: name,
        discount,
        startDate: selectedDate.startDate.toISOString(),
        endDate: selectedDate.endDate.toISOString(),
      });
      setCoupons(data.coupons);
      toastSuccess(data.message);
    } catch (error) {
      toastError(error);
    } finally {
      reset({ name: '', discount: 0 });
    }
  };

  const handleDateChange =
    (dateType: 'startDate' | 'endDate') => (newDate: Dayjs | null) => {
      setSelectedDate(prevState => ({
        ...prevState,
        [dateType]: dayjs(newDate),
      }));
    };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(createCouponHandler)}>
        <div className={styles.header}>쿠폰 생성</div>
        <AdminInput type='text' label='쿠폰명' name='name' />
        <AdminInput type='number' label='할인율' name='discount' min={1} />

        <div className={styles.date_picker}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Start Date'
              value={selectedDate.startDate}
              onChange={handleDateChange('startDate')}
            />
            <DatePicker
              label='End Date'
              value={selectedDate.endDate}
              minDate={dayjs(selectedDate.startDate).add(1, 'day')}
              onChange={handleDateChange('endDate')}
            />
          </LocalizationProvider>
        </div>

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
