import env from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import path from 'path';
import expressJSDocSwagger from 'express-jsdoc-swagger';

import { postRouter } from './endpoints/postRouter';
import { userRouter } from './endpoints/userRouter';
import { errorHandler } from './services/errorService';
import {options} from './utils/swagger';


env.config({ path: path.resolve(__dirname, '../../.env') });

const {
    PORT,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
} = process.env;

const app = express();
expressJSDocSwagger(app)(options);

app.use(fileUpload({
    createParentPath: true
}));
app.use(express.json());
app.use("/api", postRouter);
app.use("/api", userRouter);
app.use(express.static('./public/static'));
app.use(errorHandler); // обязательно в конце

const DB_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

(async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log(`server started on ${PORT}, process: ${process.pid}`);
    });
 }catch(err) {
    return console.log(err);
 } 
})();

