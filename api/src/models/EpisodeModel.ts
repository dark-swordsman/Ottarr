import { model, Schema, Types } from "mongoose";
import { Link } from "./LinkModel";
import { Season } from "./SeasonModel";
import { ISeries } from "./SeriesModel";

export interface Episode {
  name: string;
  number: number;
  type: string;
  series: Types.ObjectId | ISeries;
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
  card: {
    type: String,
    required: false,
    validate: {
      validator: (value: string) => /[a-z,A-Z,0-9,.]+/g.test(value),
      message: "Image filename must not include slashes"
    }
  },
}, {
  collection: "episode"
});

export default model<Episode>("Episode", Episode);
