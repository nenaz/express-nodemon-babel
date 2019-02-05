import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './config';

export const checkToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  // if (token.startsWith('Bearer ')) {
  //   // Remove Bearer from string
  //   token = token.slice(7, token.length);
  // }

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decode) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      }
      req.decode = decode;
      next();
    });
  }
  return res.json({
    success: false,
    message: 'Auth token is not supplied',
  });
};
