import express from "express";
const EpisodeRouter = express.Router();

import EpisodeInterface from "../interfaces/EpisodeInterface";

EpisodeRouter.use(express.json());

EpisodeRouter.post("/", (req: express.Request, res: express.Response) => {
  EpisodeInterface.createEpisode(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

EpisodeRouter.get("/", (req: express.Request, res: express.Response) => {
  const query: {
    _id?: string,
    name?: string;
    number?: number;
    type?: string;
    series?: string;
    season?: string;
    links?: string;
    card?: string;
  } = req.query;

  EpisodeInterface.findEpisodes(query)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

EpisodeRouter.get("/:id", (req: express.Request, res: express.Response) => {
  EpisodeInterface.findEpisodeById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

export default EpisodeRouter;