import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import authorsRouter from "./authors/index.js";

const server = express();
const port = 3001;

server.use(express.json());
server.use(cors());
server.use("/authors", authorsRouter);

console.table(listEndpoints(server));

server.listen(port, () => console.log("My server is online on: ", port));
