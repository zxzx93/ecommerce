import jwt from 'jsonwebtoken';

const createActivationToken = (payload: { id: string }) => {
  return jwt.sign(payload, `${process.env.ACTIVATION_TOKEN_SECRET}`, {
    expiresIn: '2d', // 2days
  });
};

export default createActivationToken;
