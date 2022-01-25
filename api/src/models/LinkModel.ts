import { Schema, model, Types } from "mongoose";
import { MediaDirectory } from "./MediaDirectoryModel";
import { Quality } from "./QualityModel";

export interface Link {
  name?: string;
  quality?: Types.ObjectId | Quality;
  priority: Number;
  originalDirectory: Types.ObjectId | MediaDirectory;
  originalSubDirectory?: string;
  originalFile: string;
  linkedDirectory: Types.ObjectId | MediaDirectory;
  linkedSubDirectory?: string;
  linkedFile: string;
}

const schema = new Schema<Link>(
  {
    name: { type: String, required: false },
    quality: { type: Schema.Types.ObjectId, required: false },
    priority: { type: Number, required: true, default: 0 }, // 0 is best, ascending worse, ideally no overlaps
    originalDirectory: { type: Schema.Types.ObjectId, required: true },
    originalSubDirectory: { type: String, require: false },
    originalFile: { type: String, require: true },
    linkedDirectory: { type: Schema.Types.ObjectId, required: true },
    linkedSubDirectory: { type: String, required: false },
    linkedFile: { type: String, required: true },
  },
  {
    collection: "link",
  }
);

export default model<Link>("Link", schema);
