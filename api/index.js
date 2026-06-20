import app from "../src/app.js";
import connectDB from "../src/database/connection.js";

let cachedDbPromise = null;

const connectToDatabase = async () => {
  if (cachedDbPromise) {
    return cachedDbPromise;
  }
  cachedDbPromise = connectDB().catch((error) => {
    cachedDbPromise = null;
    throw error;
  });
  return cachedDbPromise;
};

export default async function handler(req, res) {
  await connectToDatabase();
  return new Promise((resolve, reject) => {
    app(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
