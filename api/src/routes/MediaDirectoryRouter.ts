import express from "express";
const MediaDirectoryRouter = express.Router();

import MediaDirectoryInterface from "../interfaces/MediaDirectoryInterface";

MediaDirectoryRouter.use(express.json());

MediaDirectoryRouter.get("/", async (req: express.Request, res: express.Response) => {
  res.json({ data: await MediaDirectoryInterface.findAllMediaDirectory() });
});

export default MediaDirectoryRouter;
