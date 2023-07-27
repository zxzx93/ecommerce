import { useEffect, useState } from 'react';

const useErrorReset = (initialErrorMessage: string, delay = 2000) => {
  const [error, setError] = useState<string>(initialErrorMessage);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
        setInputValue('');
      }, delay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [error, delay]);

  return { error, setError, inputValue, setInputValue };
};

export default useErrorReset;
