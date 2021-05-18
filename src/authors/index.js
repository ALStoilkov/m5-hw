import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();

const indexPath = fileURLToPath(import.meta.url);
const dirPath = dirname(indexPath);
const authorsJSONPath = join(dirPath, "authors.json");
const authorsAsABuffer = fs.readFileSync(authorsJSONPath); // read the file
const authors = JSON.parse(authorsAsABuffer); //JSON object

authorsRouter.get("/", (req, res) => {
  //   console.log(posts);
  res.status(200).send(authors);
});
authorsRouter.get("/:id", (req, res) => {});
authorsRouter.post("/", (req, res) => {
  // req.body to object
  const newAuthor = { ...req.body, id: uniqid() };
  //push new author to file

  //return 201 + id
  res.stat;
});
authorsRouter.put("/:id", (req, res) => {});
authorsRouter.delete("/:id", (req, res) => {});

export default authorsRouter;
