const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Даних з цим Id не знайдено.. Неправильний ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Повторний ключ ${Object.keys(err.keyValue)} введено`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Ваше посилання неправильне, будь ласка спробуйте пізніше`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Термін дії посилання вичерпано, будь ласка, спробуйте пізніше!`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
