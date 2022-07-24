import express from 'express';

export const errorHandler = (err: any, req: express.Request, res: express.Response) => {
  console.log(err);
  res.status(500).send(err.message);
  // todo: bag report to mail
};


export class StatusError extends Error {
  constructor(statuseCode: number, message: string) {
    super(message);
    this.StatuseCode = statuseCode;
  }

  public StatuseCode: number;
}
