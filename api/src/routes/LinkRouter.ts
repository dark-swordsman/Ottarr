import express from "express";
const LinkRouter = express.Router();

import { Linker } from "../utils";
import LinkInterface from "../interfaces/LinkInterface";
import MediaDirectoryInterface from "../interfaces/MediaDirectoryInterface";

LinkRouter.use(express.json());

LinkRouter.get("/:id", async (req: express.Request, res: express.Response) => {
  LinkInterface.findLinkById(req.params.id)
    .then((result) => res.json({ link: result }))
    .catch((err) => res.send(err));
});

LinkRouter.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const updatedLinkData: {
      originalDirectory: any;
      linkedDirectory: any;
    } = {
      originalDirectory: await MediaDirectoryInterface.findMediaDirectoryById(req.body.originalDirectory),
      linkedDirectory: await MediaDirectoryInterface.findMediaDirectoryById(req.body.linkedDirectory),
    };

    Linker.createLinks(updatedLinkData).then((result) => res.json(result));
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

export default LinkRouter;
