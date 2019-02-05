import jwt from 'jwt-simple';
import { SECRET_KEY } from '../../../config';

export const authorization = (req, res) => {
  if (!req.headers['authorization']) {
      return res.sendStatus(401);
  }
  try {
      const username = jwt.decode(req.headers['authorization'], SECRET_KEY).username;
      return req.body.username = username
  }
  catch (err) {
      return res.sendStatus(401);
  }
};
