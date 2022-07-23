import env from 'dotenv';
import express from 'express';
import {MongoClient} from 'mongodb';

env.config();
const PORT = process.env.PORT || 5000;
console.log(process.pid);
console.log(process.env.NODE_ENV);

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
} = process.env;

const jsonParser = express.json();

const app = express();
const mongoClient = new MongoClient(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/`);

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

app.post("/api/users", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const userName = req.body.name;
    const userAge = req.body.email;
    const user = {name: userName, email: userAge};
       
    const collection = req.app.locals.collection;
    collection.insertOne(user, function(err: any, result: any){
               
        if(err) return console.log(err);
        res.send(user);
    });
});
