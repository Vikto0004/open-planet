class StatusCodeError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}



export const errorHandler = (message: string, status = 500) => {
  const error = new StatusCodeError(message, status);
  throw error;
}
