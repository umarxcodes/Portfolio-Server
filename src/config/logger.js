import morgan from "morgan";
import env from "./env.js";

const loggerFormat = env.NODE_ENV === "production" ? "combined" : "dev";
const loggerMiddleware = morgan(loggerFormat);

export default loggerMiddleware;
