import jwt from 'jsonwebtoken';

export const createActivationToken = (payload: { id: string }) => {
  return jwt.sign(payload, `${process.env.ACTIVATION_TOKEN_SECRET}`, {
    expiresIn: '2d', // 2days
  });
};

export const createResetToken = (payload: { id: string }) => {
  return jwt.sign(payload, `${process.env.RESET_TOKEN_SECRET}`, {
    expiresIn: '6h',
  });
};
