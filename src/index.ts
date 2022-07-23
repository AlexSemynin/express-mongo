import env from 'dotenv';
import express from 'express';
import {MongoClient} from 'mongodb';
import mongoose from 'mongoose';

import Post, {IPost} from './Post';

env.config();

const {
    PORT,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
} = process.env;



const jsonParser = express.json();
const app = express();
app.use(jsonParser);
const DB_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

(async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`server started on ${PORT}, process: ${process.pid}`));
 }catch(err) {
    return console.log(err);
 } 
})();

app.post('/api/posts', async (req, resp) => {
    try{
        const {author, content, title, picture}: IPost = req.body;
        const post = await Post.create<IPost>({author, content, title, picture});
        console.log(post);
        resp.status(200).json(post);
    } catch(e: any) {
        resp.status(500).json(e.message);
    }
})
