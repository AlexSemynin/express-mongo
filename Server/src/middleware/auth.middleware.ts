import express, {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import config from 'config';
import { IRequest } from '../utils/override';

export const jwtMiddleware = (req: IRequest, resp: Response, next: NextFunction) => {
  if(req.method === 'OPTIONS'){
    return next();
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', ''); // "" Bearer ij231e039-312e3oike1
    if(!token) {
      return resp.status(401).json({message: 'Auth error'});
    }
    
    const decoded = <JwtPayload>jwt.verify(token, config.get('secretKey'));
    req.User = { id: decoded.id };
    next();
  } catch (e: any) {
    return resp.status(500).json(e.message);
  }
};
