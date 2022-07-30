import User, {IUser, IUserDto} from '../dto/user';
import {fileService} from '../services/fileService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { IJwtUserPayload } from '../utils/override';

class UserService {

  private readonly _degreeHash = 10;
  private readonly _secretKey: string = config.get('secretKey');

  public async tryCreateUser( email: string, password: string ) {
    const candidate = await User.findOne({email});
    if(candidate !== null) {
      throw new Error(`User ${email} yet ready exist`);
    }
    const hashPassword = await bcrypt.hash(password, this._degreeHash);
    const user = await User.create<IUser>({email, password: hashPassword});
    await user.save();
    return user;
  }

  public async tryGetUser(email: string, password: string) {
    const candidate = await User.findOne({email});
    if(candidate === null) {
      throw new StatusError(404, `Пользователь ${email} не существует`);
    }

    const isPasswordValid = await bcrypt.compare(password, candidate.password);
    if(!isPasswordValid) {
      throw new StatusError(400, `Invalid password`);
    }
    
    const id = candidate._id.toString();
    const payload: IJwtUserPayload = { id };
    const token = jwt.sign(payload, this._secretKey, {expiresIn: '1h'});

    const user: IUserDto = {
      email: candidate.email,
      password: candidate.password,
      id: candidate._id.toString(),
    };
    return { token, user };
  }

  public async getAllUsers() {
    return await User.find();
  }

}

export const userService = new UserService(); 

export class StatusError extends Error {
  constructor(statuseCode: number, message: string) {
    super(message);
    this.StatuseCode = statuseCode;
  }

  public StatuseCode: number;
}