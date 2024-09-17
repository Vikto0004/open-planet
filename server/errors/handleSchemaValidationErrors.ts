interface CustomError extends Error {
  name: string;
  code?: number;
  status?: number;
}
const isConflict = ({ name, code }: CustomError) =>
  name === "MongoServerError" && code === 11000;

const handleSchemaValidationErrors = (
  error: CustomError,
  data: unknown,
  next: () => void,
): void => {
  console.log(error);

  error.status = isConflict(error) ? 409 : 400;
  next();
};

export default handleSchemaValidationErrors;
