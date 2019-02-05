import bcrypt from 'bcrypt';
import { forEach } from 'lodash';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../../config';

export const Auth = (req, res, db) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.sendStatus(400);
  }
  console.log('test3');
  
  db.collection('users').
    find({ username }).
    toArray().
    then((results) => {
      if (!results.length) {
        return res.sendStatus(401);
      }
      forEach(results, (item) => {
        bcrypt.compare(password, item.hash, (err, valid) => {
          if (err) {
            return res.sendStatus(500);
          }
          if (!valid) {
            return res.sendStatus(401);
          }
        });
        const token = jwt.sign(
          { username },
          SECRET_KEY,
          { expiresIn: '24h' },
        );
        res.json({
          success: true,
          token,
        });
      });
    }, (err) => {
        return res.sendStatus(500).json({
          err,
        });
    });
};
