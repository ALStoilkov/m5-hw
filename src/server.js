import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import authorsRouter from "./authors/index.js";
import blogPostsRouter from "./blogPosts/index.js";
import { catchAll, notFoundHandler } from "./errorHandlers.js";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPostsRouter);

server.use([catchAll, notFoundHandler]);

console.table(listEndpoints(server));

server.listen(port, () => console.log("My server is online on: ", port));
server.on("error", (console) => {
  console.log(`❌ The server has encountered an error: ${error}`);
});
