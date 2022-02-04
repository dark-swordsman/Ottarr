import { model, Schema, Types } from "mongoose";

export interface ISeries {
  _id?: Types.ObjectId;
  name: string;
  originalName?: string;
  description?: string;
  card?: string;
  banner?: string;
  tmdb_id: number;
  type: "tv" | "movie";
}

const Series = new Schema<ISeries>({
  name: { type: String, required: true },
  originalName: { type: String, required: false },
  description: { type: String, required: false },
  card: {
    type: String,
    required: false,
    validate: {
      validator: (value: string) => /[a-z,A-Z,0-9,.]+/g.test(value),
      message: "Image filename must not include slashes"
    }
  },
  banner: {
    type: String,
    required: false,
    validate: {
      validator: (value: string) => /[a-z,A-Z,0-9,.]+/g.test(value),
      message: "Image filename must not include slashes"
    }
  },
  tmdb_id: { type: Number, require: true },
  type: {
    type: String,
    required: true,
    enum: {
      values: ["tv", "movie"],
      message: "{VALUE} is invalid. Must be 'tv' or 'movie'"
    }
  }
}, {
  collection: "series"
});

export default model<ISeries>("Series", Series);
