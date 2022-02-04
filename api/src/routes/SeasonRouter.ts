import express from "express";
const SeasonRouter = express.Router();

import { Season } from "src/models/SeasonModel";

import SeasonInterface from "../interfaces/SeasonInterface";

SeasonRouter.use(express.json());

// SeasonRouter.get("/", async (req: express.Request, res: express.Response) => {
//   res.json({ data: await SeasonInterface.findSeason()})
// });

SeasonRouter.post("/", (req: express.Request, res: express.Response) => {
  SeasonInterface.createSeason(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

SeasonRouter.get("/", (req: express.Request, res: express.Response) => {
  const query: {
    _id?: string,
    name?: string,
    number?: string,
    series?: string,
    card?: string,
  } = req.query;

  SeasonInterface.findSeasons(query)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

SeasonRouter.get("/:id", (req: express.Request, res: express.Response) => {
  SeasonInterface.findSeasonById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

export default SeasonRouter;