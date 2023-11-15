import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import useToast from 'hooks/useToast';
import { CouponResponseData, ICoupon } from 'interfaces/back/Coupon.interface';
import { InferType, number, object, string } from 'yup';

import styles from './styles.module.scss';

interface ListItemProps {
  coupon: ICoupon;
  setCoupons: (newCoupons: ICoupon[]) => void;
}

const MIN_DISCOUNT = 1;
const MAX_DISCOUNT = 99;

const CouponSchema = object({
  name: string()
    .required('카테고리명을 입력해주세요.')
    .min(2, '최소 2글자 이상 입력해주세요.')
    .max(30, '최대 30글자 이하로 입력해주세요.')
    .matches(/^[a-zA-Z0-9]*$/, '한글 및 특수문자는 허용되지 않습니다.'),
  discount: number()
    .required('할인율을 입력해주세요.')
    .min(MIN_DISCOUNT, `할인율은 ${MIN_DISCOUNT}% 이상이어야 합니다.`)
    .max(MAX_DISCOUNT, `할인율은 ${MAX_DISCOUNT}% 이하여야 합니다`),
});
export type CouponData = InferType<typeof CouponSchema>;

function ListItem({ coupon, setCoupons }: ListItemProps) {
  const { toastSuccess, toastError } = useToast();
  const [open, setOpen] = useState(false);

  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');
  const [selectedDate, setSelectedDate] = useState({
    startDate: coupon.startDate ? dayjs(coupon.startDate) : today,
    endDate: coupon.endDate ? dayjs(coupon.endDate) : tomorrow,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CouponData>({
    resolver: yupResolver(CouponSchema),
    defaultValues: {
      name: coupon.coupon,
      discount: coupon.discount,
    },
  });

  useEffect(() => {
    setSelectedDate(prev => ({
      ...prev,
      endDate: dayjs(prev.startDate).add(1, 'day') || dayjs(prev.endDate),
    }));
  }, [selectedDate.startDate]);

  const handleActionSuccess = (data: CouponResponseData) => {
    setCoupons(data.coupons);
    setOpen(false);
    toastSuccess(data.message);
  };

  const handleRequest = async (method: 'put' | 'delete', value: object) => {
    try {
      const { data } = await axios[method]('/api/admin/coupon', value);
      handleActionSuccess(data);
    } catch (error) {
      toastError(error);
    }
  };

  const handleUpdate = handleSubmit((data: CouponData) => {
    handleRequest('put', {
      id: coupon._id,
      coupon: data.name,
      discount: data.discount,
      startDate: selectedDate.startDate,
      endDate: selectedDate.endDate,
    });
  });

  const handleRemove = () => {
    handleRequest('delete', {
      data: { id: coupon._id, coupon: coupon.coupon },
    });
  };

  const closeForm = () => {
    setOpen(false);
    reset({
      name: coupon.coupon,
      discount: coupon.discount,
    });
    setSelectedDate({
      startDate: dayjs(coupon.startDate),
      endDate: dayjs(coupon.endDate),
    });
  };

  const handleDateChange =
    (dateType: 'startDate' | 'endDate') => (newDate: Dayjs | null) => {
      setSelectedDate(prevState => ({
        ...prevState,
        [dateType]: dayjs(newDate),
      }));
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
            <input
              className={open ? styles.open : ''}
              type='number'
              disabled={!open}
              min='1'
              {...register('discount')}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Start Date'
                value={dayjs(coupon.startDate) || selectedDate.startDate}
                onChange={date => {
                  if (date && !dayjs(date).isValid()) {
                    // 에러 메시지를 표시하거나 다른 처리를 수행합니다.
                  } else {
                    handleDateChange('startDate')(date);
                  }
                }}
              />
              <DatePicker
                label='End Date'
                value={dayjs(coupon.endDate) || selectedDate.endDate}
                minDate={dayjs(selectedDate.startDate).add(1, 'day')}
                onChange={date => {
                  if (
                    date &&
                    dayjs(date).isBefore(dayjs(selectedDate.startDate))
                  ) {
                    // 에러 메시지를 표시하거나 다른 처리를 수행합니다.
                  } else {
                    handleDateChange('endDate')(date);
                  }
                }}
              />
            </LocalizationProvider>

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
