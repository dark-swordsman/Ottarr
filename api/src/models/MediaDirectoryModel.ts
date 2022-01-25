import { Schema, model } from "mongoose";

export interface MediaDirectory {
  name: string;
  source: Boolean;
  directory: string;
}

const schema = new Schema<MediaDirectory>(
  {
    name: { type: String, required: true },
    source: { type: Boolean, required: true },
    directory: { type: String, required: true },
  },
  {
    collection: "mediadirectory",
  }
);

export default model<MediaDirectory>("MediaDirectory", schema);
