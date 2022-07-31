import express, {NextFunction} from 'express';

export const errorHandler = (err: any, req: express.Request, res: express.Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send(err.message);
  res.render('error', { error: err });
  // todo: bag report to mail
};