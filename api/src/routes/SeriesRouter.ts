import express from "express";
const SeriesRouter = express.Router();

import SeriesInterface from "../interfaces/SeriesInterface";
import EpisodeInterface from "../interfaces/EpisodeInterface";

SeriesRouter.use(express.json());

SeriesRouter.post("/", (req: express.Request, res: express.Response) => {
  if (!req.query.tmdb_id) return res.send({ error: "Must provide 'tmdb_id' in query"});

  SeriesInterface.addNewSeries(`${req.query.tmdb_id}`)
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