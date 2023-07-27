import { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaIdCard, FaMapMarkerAlt } from 'react-icons/fa';
import { GiPhone } from 'react-icons/gi';
import {
  IoIosRemoveCircleOutline,
  IoMdArrowDropupCircle,
} from 'react-icons/io';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object, string } from 'yup';

import { TUser } from '../../../models/User';
import {
  fetchChangeActiveAddress,
  fetchDeleteAddress,
  fetchSaveAddress,
} from '../../../utils/fetchApi/fetchUser';
import { phoneNumberWithHyphen } from '../../../utils/formatting/numberFormat';
import handleKeyDown from '../../../utils/helpers/keyboardHandlers';
import ShippingInput from '../../inputs/shippingInput/ShippingInput';

import styles from './styles.module.scss';

interface AddressProps {
  user: TUser;
  addressesProps: {
    addresses: TUser['address'];
    setAddresses: (address: TUser['address']) => void;
  };
}

const ShippingSchema = object({
  name: string()
    .required('이름은 필수 입력 사항입니다.')
    .min(2, '이름은 2~10자 사이여야 합니다.')
    .max(10, '이름은 2~10자 사이여야 합니다.')
    .matches(/[가-힣]{2,10}$/, '숫자, 영어 및 특수 문자는 허용되지 않습니다.'),
  phoneNumber: string()
    .required('휴대폰번호는 필수 입력 사항입니다.')
    .min(11, '휴대폰 번호 11자리를 입력해 주세요.')
    .max(11, '휴대폰 번호 11자리를 입력해 주세요.')
    .matches(
      /^(01[0]{1})-?[0-9]{4}-?[0-9]{4}$/,
      '휴대폰번호가 유효하지 않습니다.'
    ),
  zipCode: string()
    .required('우편번호는 필수 입력 사항입니다.')
    .matches(
      /^(?:\d{5}|\d{3}-\d{2})$/,
      '우편번호가 유효하지 않습니다. 예) "12345" 또는 "123-45"'
    ),
  address1: string()
    .required('기본주소는 필수 입력 사항입니다. ')
    .min(5, 'Address Line 1 should contain 5-100 characters.')
    .max(30, 'Address Line 1 should contain 5-100 characters.'),
  address2: string()
    .min(0, 'Address Line 2 should contain 5-100 characters.')
    .max(30, 'Address Line 2 should contain 5-100 characters.'),
});

type ShippingData = InferType<typeof ShippingSchema>;

const initialValues: ShippingData = {
  name: '',
  phoneNumber: '',
  zipCode: '',
  address1: '',
  address2: '',
};

function Shipping({
  user,
  addressesProps: { addresses, setAddresses },
}: AddressProps) {
  const [shipping, setShipping] = useState(initialValues);
  const [visibleForm, setVisibleForm] = useState(user?.address.length === 0);

  const ShippingMethod = useForm<ShippingData>({
    resolver: yupResolver(ShippingSchema),
  });
  const { handleSubmit, reset, clearErrors } = ShippingMethod;

  useEffect(() => {
    // visibleForm이 안 열려있을때 모든 에러 리셋, 인풋 값도 리셋
    if (!visibleForm) {
      clearErrors();
      reset();
    }
  }, [visibleForm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const saveShippingHandler = async () => {
    const res = await fetchSaveAddress(shipping);
    setAddresses(res.data);
    setVisibleForm(false);
    reset();
  };

  const changeActiveHandler = async (id: string) => {
    const res = await fetchChangeActiveAddress(id);
    setAddresses(res.data);
  };

  const deleteHandler = async (id: string) => {
    const res = await fetchDeleteAddress(id);
    setAddresses(res.data);
  };

  return (
    <div className={styles.shipping}>
      <div className={styles.header}>
        <h3>주소록 관리</h3>
      </div>
      <div className={styles.addresses}>
        {addresses?.map(address => {
          const addressId = address._id?.toString() as string;
          return (
            <div key={addressId} style={{ position: 'relative' }}>
              <div
                className={styles.address_delete}
                onClick={() => deleteHandler(addressId)}
                onKeyDown={e =>
                  handleKeyDown(e, () => deleteHandler(addressId))
                }
                role='button'
                tabIndex={0}
              >
                <IoIosRemoveCircleOutline />
              </div>
              <div
                className={`${styles.address} ${address.active && styles.active}
            }`}
                onClick={() => changeActiveHandler(addressId)}
                onKeyDown={e =>
                  handleKeyDown(e, () => changeActiveHandler(addressId))
                }
                role='button'
                tabIndex={0}
              >
                <div className={styles.address_side}>
                  <img src={user.image} alt='사용자 이미지' />
                </div>
                <div className={styles.address_col}>
                  <span>
                    <FaMapMarkerAlt />
                    {address.address1}
                  </span>
                  <span>{address.address2} </span>
                  <span>({address.zipCode})</span>
                </div>
                <div className={styles.address_col}>
                  <span>
                    <FaIdCard />
                    {address.name}
                  </span>
                  <span>
                    <GiPhone />
                    {phoneNumberWithHyphen(address.phoneNumber)}
                  </span>
                </div>

                <span
                  className={styles.active__text}
                  style={{
                    display: `${address.active ? 'block' : 'none'}`,
                  }}
                >
                  기본 배송지
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className={styles.showForm}
        onClick={() => setVisibleForm(!visibleForm)}
      >
        {visibleForm ? (
          <span>
            <IoMdArrowDropupCircle />
          </span>
        ) : (
          <span>주소록 추가</span>
        )}
      </button>

      {visibleForm && (
        <FormProvider {...ShippingMethod}>
          <form onSubmit={handleSubmit(saveShippingHandler)}>
            <ShippingInput
              name='name'
              placeholder='*이름'
              onChange={handleChange}
            />
            <ShippingInput
              name='phoneNumber'
              placeholder='*휴대폰번호'
              onChange={handleChange}
            />
            <ShippingInput
              name='zipCode'
              placeholder='*우편번호'
              onChange={handleChange}
            />
            <ShippingInput
              name='address1'
              placeholder='*기본주소'
              onChange={handleChange}
            />
            <ShippingInput
              name='address2'
              placeholder='상세주소'
              onChange={handleChange}
            />

            <div className={styles.submitBtn}>
              <button type='submit'>저장</button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

export default Shipping;
