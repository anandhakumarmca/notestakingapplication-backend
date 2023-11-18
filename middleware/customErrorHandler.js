const customErrorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    err = new Error("Duplicate Field Value Entered");
    err.statusCode = 404;
  }

  if (err instanceof SyntaxError) {
    err = new Error("Unexpected Syntax");
    err.statusCode = 400;
  }

  if (err instanceof ValidationError) {
    err.statusCode = 400;
  }

  if (err instanceof CastError) {
    err = new Error("Please provide a valid ID");
    err.statusCode = 400;
  }

  if (err instanceof TokenExpiredError) {
    err = new Error("JWT token has expired");
    err.statusCode = 401;
  }

  if (err instanceof JsonWebTokenError) {
    err = new Error("JWT token is malformed");
    err.statusCode = 401;
  }

  console.log("Custom Error Handler =>", err.name, err.message, err.statusCode);

  return res.status(err.statusCode || 500).json({
    success: false,
    error: {
      code: err.statusCode || 500,
      message: err.message || "Server Error",
      // You can add more fields here if needed
    },
  });
};

export default customErrorHandler;
