import express from 'express';
import User, { IUserDto, IUser } from '../dto/user';
import { userService} from '../services/userService';
import { validationResult} from 'express-validator';
import { StatusError } from '../services/errorService';

class UserConteroller {
  public async signIn (req: express.Request, resp: express.Response) {
    try{
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() }); 
      }
      const { email, password }: IUser = req.body;
      const user = await userService.tryCreateUser(email, password);
      resp.status(200).json(user);
    } catch(e: any) {
      resp.status(500).json(e.message);
    }
  }

  public async logIn(req: express.Request, resp: express.Response) {
    try{
      const { email, password }: IUser = req.body;
      const {token, user} = await userService.tryGetUser(email, password);
      return resp.status(200).json({token, user});
    } catch (e: any) {
      if(e instanceof StatusError) {
        return resp.status(e.StatuseCode).json(e.message);
      }
      return resp.status(500).json(e.message);
    }
  }
}


export const userController = new UserConteroller();
