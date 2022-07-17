import env from 'dotenv';
import express from 'express';
import {MongoClient} from 'mongodb';

env.config();
const PORT = process.env.PORT || 5000;
console.log(process.pid);
console.log(process.env.NODE_ENV);

const app = express();
const mongoClient = new MongoClient('mongodb://localhost:27017');

(async () => {
  try {
     await mongoClient.connect();
     app.locals.collection = mongoClient.db("usersdb").collection("users");
     await app.listen(PORT, () => console.log(`server started on ${PORT}`));
     console.log("Сервер ожидает подключения...");
 }catch(err) {
     return console.log(err);
 } 
})();
