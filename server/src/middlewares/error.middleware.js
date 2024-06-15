import { ApiError } from "../utils/apiError.js";

const errorHandler = (err, req, res) => {
  console.log("err", err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal Server Error",
  });
};

export { errorHandler };
