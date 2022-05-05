import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({ path: "src/.env" });

import {
  QualityRouter,
  MediaDirectoryRouter,
  LinkRouter,
  TMDBRouter,
  SeriesRouter,
  FileRouter,
  SeasonRouter,
  EpisodeRouter,
} from "./routes";
import { MediaInfo } from "./helpers";
import { ServiceManager } from "./services";

// definitions

const server = express();
const port = 6969;

const dbURL = `mongodb://${process.env.DB_LOCATION}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// main

mongoose.connect(dbURL);

server.use(express.json());
server.use(cors());

server.use("/quality", QualityRouter);
server.use("/mediadirectory", MediaDirectoryRouter);
server.use("/link", LinkRouter);
server.use("/tmdb", TMDBRouter);
server.use("/series", SeriesRouter);
server.use("/season", SeasonRouter);
server.use("/episode", EpisodeRouter);
server.use("/file", FileRouter);

server.post("/mediainfo", (req: express.Request, res: express.Response) => {
  MediaInfo.getMediaInfo(req.body.directory).then((mediainfoJSON) => {
    res.json(mediainfoJSON);
  });
});

server.listen(port, () => console.log(`Running server on: ${port}!`));

ServiceManager.initialize();

// debug

process.on("uncaughtException", (p) => {
  console.error(`Uncaught Exception Error:\n${require("util").inspect(p, { depth: 2 })}`);
});
process.on("unhandledRejection", (p) => {
  console.error(`Uncaught Promise Error:\n${require("util").inspect(p, { depth: 2 })}`);
});
