import env from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

import {postRouter} from './endpoints/postRouter';

env.config();

const {
    PORT,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
} = process.env;

const app = express();
app.use(fileUpload({
    createParentPath: true
}));
app.use(express.json());
app.use("/api", postRouter);
app.use(express.static('../public/static'));

const DB_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

(async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`server started on ${PORT}, process: ${process.pid}`));
 }catch(err) {
    return console.log(err);
 } 
})();

