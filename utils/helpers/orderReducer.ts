import { ActionTypes, StateType } from '../../interfaces/front/Order.interface';

function orderReducer(state: StateType, action: ActionTypes) {
  switch (action.type) {
    case 'PAY_REQUEST':
      return { ...state, loading: true };
    case 'PAY_SUCCESS':
      return { ...state, loading: false, success: true };
    case 'PAY_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_RESET':
      return { ...state, loading: false, success: false, error: false };
    default:
      return state;
  }
}

export default orderReducer;
