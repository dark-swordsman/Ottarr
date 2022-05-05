import { model, Schema, Types } from "mongoose";
import { ActionType } from "@types";
import { ITask } from "./TaskModel";

export interface IAction {
  _id?: Types.ObjectId;
  task: Types.ObjectId | ITask;
  type: ActionType;
  data: object;
  complete: boolean;
}

const Action = new Schema<IAction>(
  {
    task: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    data: { type: Object, required: true },
    complete: { type: Boolean, require: true, default: false },
  },
  { collection: "action" }
);

export default model<IAction>("Action", Action);
