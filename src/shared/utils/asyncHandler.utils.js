import expressAsyncHandler from "express-async-handler";

const asyncHandler = (fn) => expressAsyncHandler(fn);

export default asyncHandler;
