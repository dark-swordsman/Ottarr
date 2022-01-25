import { Schema, model, Types } from "mongoose";
import { Link } from "./LinkModel";
import { Season } from "./SeasonModel";
import { Series } from "./SeriesModel";

export interface Episode {
  name: string;
  number: number;
  type: string;
  series: Types.ObjectId | Series;
  season?: Types.ObjectId | Season;
  links?: Types.ObjectId[] | Link;
  card?: string;
}

const Episode = new Schema<Episode>({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  type: { type: String, require: true }, // movie vs episode??
  series: { type: Schema.Types.ObjectId, required: true },
  season: { type: Schema.Types.ObjectId, required: false },
  links: { type: [Schema.Types.ObjectId], required: false },
  card: { type: String, required: false },
}, {
  collection: "episode"
});

export default model<Episode>("Episode", Episode);
