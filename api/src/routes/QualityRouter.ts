import express from "express";
const QualityRouter = express.Router();

import QualityInterface from "../interfaces/QualityInterface";

QualityRouter.use(express.json());

QualityRouter.get("/", async (req: express.Request, res: express.Response) => {
  res.json({ data: await QualityInterface.findAllQuality() });
});

export default QualityRouter;
