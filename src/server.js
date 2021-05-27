import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import authorsRouter from "./authors/index.js";
import blogPostsRouter from "./blogPosts/index.js";
import {
  badRequestErrorHandler,
  catchAllErrorHandler,
  forbiddenErrorHandler,
  notFoundErrorHandler,
} from "./errorHandlers.js";

const server = express();
const port = process.env.PORT || 3001;

const whiteList = [process.env.LOCAL_URL, process.env.DEPLOYED_URL];

const corsOptions = {
  origin: (origin, next) => {
    console.log("MY ORIGIN", origin);
    if (whiteList.indexOf(origin) > -1) {
      next(null, true);
    } else {
      next(new Error("CHECK CORS!"));
    }
  },
};

server.use(cors(corsOptions));
server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPostsRouter);

server.use([
  badRequestErrorHandler,
  forbiddenErrorHandler,
  notFoundErrorHandler,
  catchAllErrorHandler,
]);

console.table(listEndpoints(server));

server.listen(port, () => console.log("My server is online on: ", port));
server.on("error", (console) => {
  console.log(`❌ The server has encountered an error: ${error}`);
});
