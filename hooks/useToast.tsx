import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface ErrorResponseData {
  message?: string;
}

const useToast = () => {
  const toastSuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  const toastError = useCallback((error: AxiosError<ErrorResponseData>) => {
    const message =
      error.response?.data.message || '알 수 없는 문제가 발생했습니다.';
    toast.error(message);
  }, []);

  return { toastSuccess, toastError };
};

export default useToast;
