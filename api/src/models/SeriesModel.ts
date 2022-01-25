import { Schema, model, Types } from "mongoose";
import { Episode } from "./EpisodeModel";
import { Season } from "./SeasonModel";

export interface Series {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  seasons?: Types.ObjectId[] | Season;
  episodes: Types.ObjectId[] | Episode;
  card?: string;
  banner?: string;
  tmdb_id: number;
}

const Series = new Schema<Series>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  seasons: { type: [Schema.Types.ObjectId], required: false },
  episodes: { type: [Schema.Types.ObjectId], required: true },
  card: { type: String, required: false },
  banner: { type: String, required: false },
  tmdb_id: { type: Number, require: true },
}, {
  collection: "series"
});

export default model<Series>("Series", Series);
