import fs from "node:fs";
import path from "node:path";
import morgan from "morgan";
import env from "./env.js";

const logsDirectory = path.join(process.cwd(), "logs");
const accessLogPath = path.join(logsDirectory, "access.log");
const loggerFormat = env.NODE_ENV === "production" ? "combined" : "dev";

if (env.NODE_ENV === "production") {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

const loggerMiddleware =
  env.NODE_ENV === "production"
    ? morgan(loggerFormat, {
        stream: fs.createWriteStream(accessLogPath, { flags: "a" }),
      })
    : morgan(loggerFormat);

export default loggerMiddleware;
