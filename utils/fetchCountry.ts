import axios from 'axios';

const fetchCountry = async () => {
  try {
    const res = await axios.get(
      `https://api.ipregistry.co/?key=${process.env.COUNTRY_API_KEY}`
    );
    return res.data.location.country;
  } catch (err) {
    console.log(err);
  }
};

export default fetchCountry;
