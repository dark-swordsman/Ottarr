import express from "express";
const FileRouter = express.Router();

import { FileSystem } from "../utils";

FileRouter.use(express.json());

FileRouter.get("/", (req: express.Request, res: express.Response) => {
  if (!req.query.path) return res.send({ error: "must provide path" });

  FileSystem.readDirectory(`${req.query.path}`)
    .then((result) => res.json({ files: result }))
    .catch((error) => res.send({ error }));
});

export default FileRouter;