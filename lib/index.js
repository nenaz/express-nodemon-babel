import express from "express";
import { MongoClient } from "mongodb";
import { urlencoded, json } from "body-parser";
import { DB_URL_WITH_DB_NAME, DB_USER, DB_PASSWORD, DB_NAME, DB_URL } from './config';
import { middleWare } from './app/routes';
import { checkToken } from './middleware';

const app = express();
const PORT = process.env.PORT || 5000

app.use(urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin");
  next();
});
app.use(json());

MongoClient.connect(DB_URL_WITH_DB_NAME, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log('err', err);
    
  }
  const database = client.db(DB_NAME);
  middleWare(app, database);
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  app.listen(PORT, () => {
    console.log('We are live on ' + PORT);
  });
});
