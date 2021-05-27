import express from "express";
import uniqid from "uniqid";
import { getAuthors, writeAuthors } from "../lib/fs-tools.js";

const authorsRouter = express.Router();
authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    if (authors.length > 0) {
      res.send(authors);
    } else {
      // console.log(`ERROR IN ELSE`);
      next(createError(404, `There are no authors yet`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
authorsRouter.get("/:id", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    const author = authors.find((post) => post._id === req.params.id);
    // console.log(author);
    author
      ? res.send(author)
      : next(createError(404, `There is no post with ID: ${req.params.id}`));
  } catch (error) {
    next(error);
  }
});
authorsRouter.post("/", async (req, res, next) => {
  try {
    // console.log(req.body);
    const newAuthor = { ...req.body, _id: uniqid(), createdAt: new Date() };
    const getAuthors = await getAuthors();
    getAuthors.push(newAuthor);
    await writeAuthors(getAuthors);
    res.status(201).send({ _id: newAuthor._id });
  } catch (error) {
    next(error);
  }
});
authorsRouter.put("/:id", async (req, res, next) => {
  try {
    const filteredAuthors = await getAuthors().filter(
      (post) => post._id !== req.params.id
    );
    const newAuthor = { ...req.body, modifiedAt: new Date() };
    const authors = filteredAuthors.push(newAuthor);
    await writeAuthors(authors);
    res.send(newAuthor);
  } catch (error) {
    next(error);
  }
});
authorsRouter.delete("/:id", async (req, res, next) => {
  try {
    const getAuthors = await getAuthors();
    const filteredAuthors = getAuthors.filter(
      (post) => post._id !== req.params.id
    );
    await writeAuthors(filteredAuthors);
    res.status(204).send(`Post with ID ${req.params.id} deleted`);
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
