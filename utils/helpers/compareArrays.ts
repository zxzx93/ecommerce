import { CartItem } from '../../interfaces/front/Cart.interface';

const compareArrays = (array1: CartItem[], array2: CartItem[]): boolean => {
  if (array1.length !== array2.length) return false;

  const item = (obj: { [key: string]: any }): string =>
    JSON.stringify(
      Object.keys(obj)
        .sort()
        .map(key => [key, obj[key]])
    );

  const set1 = new Set(array1.map(item));
  const set2 = new Set(array2.map(item));

  // set2에 있는 요소가 set1에도 모두 포함되어 있다면 true를, 그렇지 않다면 false를 반환
  return [...set2].every(obj => set1.has(obj));
};

export default compareArrays;
