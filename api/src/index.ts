import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({ path: "src/.env" });

const { directories, database } = require("./config.json");
const { Linker } = require("./helpers");

import { QualityRouter, MediaDirectoryRouter, LinkRouter, TMDBRouter, SeriesRouter } from "./routes";
import MediaInfo from "./helpers/MediaInfo";

const server = express();
const port = 6969;

const dbURL = `mongodb://${database.location}:${database.port}/${database.database}`;

mongoose.connect(dbURL);

server.use(express.json());
server.use(cors());

server.use("/quality", QualityRouter);
server.use("/mediadirectory", MediaDirectoryRouter);
server.use("/link", LinkRouter);
server.use("/tmdb", TMDBRouter);
server.use("/series", SeriesRouter);

server.post("/mediainfo", (req: express.Request, res: express.Response) => {
  MediaInfo.getMediaInfo(req.body.directory).then((mediainfoJSON) => {
    res.json(mediainfoJSON);
  });
});

server.listen(port, () => console.log(`Running server on: ${port}!`));

process.on("uncaughtException", (p) => {
  console.error(`Uncaught Exception Error:\n${require("util").inspect(p, { depth: 2 })}`);
});
process.on("unhandledRejection", (p) => {
  console.error(`Uncaught Promise Error:\n${require("util").inspect(p, { depth: 2 })}`);
});
