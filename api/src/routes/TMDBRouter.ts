import express from "express";
const TMDBRouter = express.Router();

import TMDBInterface from "../interfaces/TMDBInterface";

TMDBRouter.use(express.json());

TMDBRouter.get("/search", async (req: express.Request, res: express.Response) => {
  if (!req.query.query) return res.send("ERROR: No Query");
  
  TMDBInterface.searchForMovieAndTVShow(req.query.query.toString())
    .then((result) => res.json(result))
    .catch((err) => res.send({ error: err }));
});

TMDBRouter.get("/image/:id", async (req: express.Request, res: express.Response) => {
  TMDBInterface.getImage(req.params.id)
    .then((result) => {
      res.setHeader("content-type", result.contentType);
      res.send(result.data);
    })
    .catch((err) => {
      res.statusCode = 500;
      console.error(err);
      res.send({ error: err });
    });
});

export default TMDBRouter;