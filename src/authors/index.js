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
authorsRouter.get("/:id", (req, res) => {
  // console.log(req.params.id);
  //search for an ID in the array
  const searchedAuthor = authors.find((author) => author.id === req.params.id);
  // console.log(searchedAuthor);
  //code and return author
  res.status(200).send(searchedAuthor);
});
authorsRouter.post("/", (req, res) => {
  // req.body to object with and ID
  const newAuthor = { ...req.body, id: uniqid() };
  //push new author to file
  authors.push(newAuthor);
  // write new json
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));
  //return 201 + id
  res.status(201).send(newAuthor.id);
});
authorsRouter.put("/:id", (req, res) => {
  // remove the one we modify
  const newArrOfAuthors = authors.filter(
    (author) => author.id !== req.params.id
  );
  // create a new one using the req.body
  const updatedAuthor = { ...req.body, id: req.params.id };
  // push to array
  newArrOfAuthors.push(updatedAuthor);
  // write new json
  fs.writeFileSync(authorsJSONPath, JSON.stringify(newArrOfAuthors));
  // res
  res.status(200).send(updatedAuthor);
});
authorsRouter.delete("/:id", (req, res) => {
  // filter author to del
  const newArrOfAuthors = authors.filter(
    (author) => author.id !== req.params.id
  );
  // write new json
  fs.writeFileSync(authorsJSONPath, JSON.stringify(newArrOfAuthors));
  //res
  res.status(204).send();
});

export default authorsRouter;
