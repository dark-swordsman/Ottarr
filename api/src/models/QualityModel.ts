import { Schema, model } from "mongoose";

export interface Quality {
  name: string;
  tag: string;
  priority: Number;
}

const schema = new Schema<Quality>(
  {
    name: { type: String, required: true },
    tag: { type: String, required: true },
    priority: { type: Number, required: true }, // 0 is best, ascending worse, ideally no overlaps
  },
  {
    collection: "quality",
  }
);

export default model<Quality>("Quality", schema);
