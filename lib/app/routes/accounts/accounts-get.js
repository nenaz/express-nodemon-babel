import { authorization } from '../auth';

export const getAccounts = (req, res, db) => {
  const username = authorization(req, res)
  db.collection('accounts').
    find({
      username
    }).
    toArray().
    then((result) => {
      res.send(result);
    }, (err) => {
      console.log('Error:', err);
    });
};
