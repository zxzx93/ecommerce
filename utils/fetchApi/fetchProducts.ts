import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${process.env.BASE_URL}/api/products`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const fetchProductDetail = async ({ slug, style, size }: any) => {
  try {
    const res = await axios.get(
      `${process.env.BASE_URL}/api/product/${slug}?style=${style}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
