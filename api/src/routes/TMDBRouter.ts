import express from "express";
import {
  BannerSize,
  PosterSize
} from "types";
const TMDBRouter = express.Router();

import TMDBInterface from "../interfaces/TMDBInterface";

TMDBRouter.use(express.json());

TMDBRouter.get("/search", async (req: express.Request, res: express.Response) => {
  if (!req.query.query) return res.send("ERROR: No Query");

  TMDBInterface.searchForMovieAndTVShow(req.query.query.toString())
    .then((result) => res.json(result))
    .catch((error) => res.send({ error }));
});

TMDBRouter.get("/tv/:id", (req: express.Request, res: express.Response) => {
  TMDBInterface.getTVShowInfo(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.send({ error }));
});

TMDBRouter.get("/movie/:id", (req: express.Request, res: express.Response) => {
  TMDBInterface.getMovieInfo(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.send({ error }));
});

TMDBRouter.get("/image/poster/:id", async (req: express.Request, res: express.Response) => {
  if (!req.query.imageSize) return res.status(400).send({ error: true, description: "must provide 'imageSize' as query" });

  TMDBInterface.getImage(req.params.id, req.query.imageSize as PosterSize)
    .then((result) => {
      res.set("content-type", result.contentType);
      res.set("cache-control", "max-age=86400");
      res.send(result.data);
    })
    .catch((error) => {
      res.statusCode = 500;
      console.error(error);
      res.send({ error });
    });
});

TMDBRouter.get("/image/banner/:id", async (req: express.Request, res: express.Response) => {
  if (!req.query.imageSize) return res.status(400).send({ error: true, description: "must provide 'imageSize' as query" });

  TMDBInterface.getImage(req.params.id, req.query.imageSize as BannerSize)
    .then((result) => {
      res
        .set("content-type", result.contentType)
        .set("cache-control", "max-age=86400")
        .send(result.data);
    })
    .catch((error) => {
      res.statusCode = 500;
      console.error(error);
      res.send({ error });
    });
});

export default TMDBRouter;