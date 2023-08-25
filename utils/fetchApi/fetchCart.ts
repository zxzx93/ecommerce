import axios from 'axios';

import { CartItem } from '../../interfaces/front/Cart.interface';

// checkout 결제 버튼 클릭시 카트에 저장
export const fetchSaveCart = async (selectedItems: CartItem[]) => {
  try {
    const { data } = await axios.post(`/api/user/saveCart`, {
      selectedItems,
    });
    return data;
  } catch (err) {
    // return response.data.error.message;
    return err;
  }
};

// db정보 바뀌면 카트에 있는 정보 업데이트 됨
export const fetchUpdateCart = async (cartItems: CartItem[]) => {
  try {
    const { data } = await axios.post('/api/user/updateCart', {
      products: cartItems,
    });
    return data;
  } catch (err) {
    // return response.data.error.message;
    return err;
  }
};
