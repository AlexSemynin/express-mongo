import {Request} from 'express';
import { Types } from 'mongoose';

export interface IRequest extends Request {
  User?: IJwtUserPayload;
}

export interface IJwtUserPayload {
  id: string;// Types.ObjectId;
  // todo: add roles
}