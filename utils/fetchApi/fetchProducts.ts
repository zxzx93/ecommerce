import axios from 'axios';

const fetchProducts = async () => {
  try {
    const res = await axios.get(`${process.env.BASE_URL}/api/products`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default fetchProducts;
