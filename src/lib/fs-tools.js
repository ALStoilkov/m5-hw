import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const dataFolder = join(dirname(fileURLToPath(import.meta.url)), "../data");
const authorsJson = join(dataFolder, "authors.json");
const blogPostsJson = join(dataFolder, "blogPosts.json");

export const getAuthors = async () => {
  return await fs.readJSON(authorsJson);
};
export const getBlogPosts = async () => {
  return await fs.readJSON(blogPostsJson);
};

export const writeAuthors = async (content) => {
  return await fs.writeJSON(authorsJson, content);
};
export const writeBlogPosts = async (content) => {
  return await fs.writeJSON(blogPostsJson, content);
};
