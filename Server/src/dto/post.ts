import { ObjectId } from "mongodb";
import mongoose, { Schema, SchemaDefinitionProperty } from "mongoose";

export interface IPost {
  author: string;
  title: string;
  content: string;
  userId: SchemaDefinitionProperty<string>;
  picture?: string;
}

const Post = new Schema<IPost>({
  author: {type: String, required: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  picture: {type: String},
  userId: {type: Schema.Types.ObjectId, ref:'User', required: true},
});

export default mongoose.model('Post', Post);