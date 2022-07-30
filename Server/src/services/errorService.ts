export class StatusError extends Error {
  constructor(statuseCode: number, message: string) {
    super(message);
    this.StatuseCode = statuseCode;
  }

  public StatuseCode: number;
}
