import express from "express";
const SeriesRouter = express.Router();

import SeriesInterface from "../interfaces/SeriesInterface";
import EpisodeInterface from "../interfaces/EpisodeInterface";

SeriesRouter.use(express.json());

SeriesRouter.post("/", (req: express.Request, res: express.Response) => {
  const { tmdb_id, type } = req.body;

  if (!tmdb_id) return res.send({ error: "Must provide 'tmdb_id' in query" });
  if (!type) return res.send({ error: "Must provide 'type' in query" });

  SeriesInterface.addNewSeries({ id: `${tmdb_id}`, type: `${type}` })
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

SeriesRouter.get("/", (req: express.Request, res: express.Response) => {
  const query: {
    _id?: string;
    name?: string;
    originalName?: string;
    description?: string;
    card?: string;
    banner?: string;
    tmdb_id?: number;
    type?: "tv" | "movie";
  } = req.query

  SeriesInterface.findSeries(query)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

SeriesRouter.get("/:id", (req: express.Request, res: express.Response) => {
  SeriesInterface.findSeriesById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

SeriesRouter.get("/:id/episodes", (req: express.Request, res: express.Response) => {
  EpisodeInterface.findEpisodesBySeries(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

export default SeriesRouter;