import { checkSchema, validationResult } from "express-validator";

const schema = {
  category: {
    in: ["body"],
    isString: { errorMessage: "Category must be a string!" },
  },
  title: {
    in: ["body"],
    isString: { errorMessage: "Title must be a string!" },
  },
  cover: {
    in: ["body"],
    isString: { errorMessage: "Cover  must be a string!" },
  },
  "readTime.value": {
    in: ["body"],
    isNumeric: { errorMessage: "Read time must be numreric!" },
  },
  "readTime.unit": {
    in: ["body"],
    isString: { errorMessage: "Unit  must be a string!" },
  },
  "author.name": {
    in: ["body"],
    isString: { errorMessage: "Author's name must be a string!" },
  },
  "author.avatar": {
    in: ["body"],
    isString: { errorMessage: "Author's avatar must be a string!" },
  },
  content: {
    in: ["body"],
    isString: { errorMessage: "Content must be a string!" },
  },
};

export const checkBlogSchema = checkSchema(schema);

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  //   console.log(`errors in validation ${errors}`);
  if (!errors.isEmpty()) {
    const error = new Error(`Error in blog post validation!`);
    error.status = 400;
    error.errors = errors.array;
    // console.log(error.status);
    next(error);
  } else next();
};
