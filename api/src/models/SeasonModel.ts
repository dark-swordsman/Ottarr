import { Schema, model, Types } from "mongoose";
import { Episode } from "./EpisodeModel";
import { Series } from "./SeriesModel";

export interface Season {
  _id?: Types.ObjectId;
  name: string;
  number: number;
  series?: Types.ObjectId | Series;
  episodes: Types.ObjectId[] | Episode;
  card?: string;
}

const Season = new Schema<Season>({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  series: { type: Schema.Types.ObjectId, required: true },
  episodes: { type: [Schema.Types.ObjectId], required: true },
  card: { type: String, required: false },
}, {
  collection: "season"
});

export default model<Season>("Season", Season);
