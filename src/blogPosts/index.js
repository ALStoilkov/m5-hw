import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import { getBlogPosts, writeBlogPosts } from "../lib/fs-tools.js";
import { checkBlogSchema, checkValidationResult } from "./validation.js";

const blogPostsRouter = express.Router();

blogPostsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await getBlogPosts();
    if (posts.length > 0) {
      res.send(posts);
    } else {
      // console.log(`ERROR IN ELSE`);
      next(createError(404, `There are no posts yet`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
blogPostsRouter.get("/:id", async (req, res, next) => {
  try {
    const posts = await getBlogPosts();
    const blogPost = posts.find((post) => post._id === req.params.id);
    // console.log(blogPost);
    blogPost
      ? res.send(blogPost)
      : next(createError(404, `There is no post with ID: ${req.params.id}`));
  } catch (error) {
    next(error);
  }
});
blogPostsRouter.post(
  "/",
  checkBlogSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      console.log(req.body);
      const newPost = {
        _id: uniqid(),
        ...req.body,
        createdAt: new Date(),
        modifiedAt: new Date(),
      };
      const getPosts = await getBlogPosts();
      getPosts.push(newPost);
      await writeBlogPosts(getPosts);
      res.status(201).send({ _id: newPost._id });
    } catch (error) {
      next(error);
    }
  }
);
blogPostsRouter.put("/:id", async (req, res, next) => {
  try {
    const filteredPosts = await getBlogPosts().filter(
      (post) => post._id !== req.params.id
    );
    const newPost = { ...req.body, modifiedAt: new Date() };
    const posts = filteredPosts.push(newPost);
    await writeBlogPosts(posts);
    res.send(newPost);
  } catch (error) {
    next(error);
  }
});
blogPostsRouter.delete("/:id", async (req, res, next) => {
  try {
    const getPosts = await getBlogPosts();
    const filteredPosts = getPosts.filter((post) => post._id !== req.params.id);
    await writeBlogPosts(filteredPosts);
    res.status(204).send(`Post with ID ${req.params.id} deleted`);
  } catch (error) {
    next(error);
  }
});

export default blogPostsRouter;
