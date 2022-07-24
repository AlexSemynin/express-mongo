import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

export interface IUserDto extends IUser {
  id: string;
}

const User = new mongoose.Schema<IUser>({
  email: {type: String, required: true},
  password: {type: String, required: true},
});

export default mongoose.model('User', User);