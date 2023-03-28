import React from 'react';

import Header from '../components/header';

const country = {
  name: 'Morocco',
  flag: 'https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360',
};
const cart = () => {
  return (
    <div>
      <Header country={country} />
    </div>
  );
};

export default cart;
