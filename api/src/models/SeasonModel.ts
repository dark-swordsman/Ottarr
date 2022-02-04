import { model, Schema, Types } from "mongoose";
import { ISeries } from "./SeriesModel";

export interface Season {
  _id?: Types.ObjectId;
  name: string;
  number: number;
  series: Types.ObjectId | ISeries;
  card?: string;
}

const Season = new Schema<Season>({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  series: { type: Schema.Types.ObjectId, required: true },
  card: { type: String, required: false },
}, {
  collection: "season"
});

export default model<Season>("Season", Season);
