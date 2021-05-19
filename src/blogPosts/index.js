import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createError from "http-errors";

const blogPostsRouter = express.Router();

const blogPostsJsonPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blogPosts.json"
);

const getBlogPosts = () => {
  return JSON.parse(fs.readFileSync(blogPostsJsonPath));
};

const writeBlocPosts = (posts) =>
  fs.writeFileSync(blogPostsJsonPath, JSON.stringify(posts));

blogPostsRouter.get("/", (req, res, next) => {
  try {
    res.send(getBlogPosts());
  } catch (error) {
    next(error);
  }
});
blogPostsRouter.get("/:id", (req, res, next) => {
  try {
    const blogPost = getBlogPosts().find((post) => post.id === req.params.id);
    blogPost
      ? res.send(blogPost)
      : next(createError(404, `There is no post with ID: ${req.params.id}`));
  } catch (error) {
    next(error);
  }
});
blogPostsRouter.post("/", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
blogPostsRouter.put("/:id", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
blogPostsRouter.delete("/:id", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default blogPostsRouter;
