import AppError from "../shared/errors/index.js";

const notFoundMiddleware = (req, res, next) => {
  next(new AppError(404, "Resource not found", []));
};

export default notFoundMiddleware;
