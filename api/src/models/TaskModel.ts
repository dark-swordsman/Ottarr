import { model, Schema, Types } from "mongoose";
import { TaskStatus } from "@types";

// task has actions
// actions have data like a normal request + endpoint

/*
tasks will primarily just be a historical log
  think of a logger that is attached to other methods to report what is going on

For example, when we send a hardlink request from the front end, we would send it normally
  then, on the actual interface method for hardlinks, we can create a task with the status of "pending" or something
  then, when it is done, we can "complete" it, or if it fails, have a "failed" status

In the instance of queued tasks, same deal.
  If we want to queue hardlinks from an automatic file check (reading the file system for new files), we can
  have the method for file reading simply create queued tasks with a status of "queued" (in the instances that 
  it's set to QUEUE ONLY or QUEUE WITH LOW CONFIDENCE)

  Though we can probably use another status besides "QUEUED" since queued implies that it will activate at some point.

We would most likely just import the interfaces for various objects, like task interface, etc.
  We could have a separate method interface, or some other set of methods that are specific to executing the
  methods required by the task.

  Tasks would be executing the task + updating the task object, so it makes sense to have it's own methods. 

  Actions would be official tags that we can enforce via a TS type that trigger certain methods. So we can have action + associatd data.

SKIPS
  It could be possible to have actions be skipped... maybe? Though ideally the --

REVERTING
  Reversions will have their own event. They also require an opposite method to undo, say LINK_DELETE when there was LINK_CREATE

EVENTS
  There should also be an "events" model/interface to simply log events that have happened, mainly to keep track of what the tasks are doing.

  There could be event objects, and instances where the task does multiple actions, an event for "running" could be updated with what happens on the task.

  Or we could just have a separate field for task events and update the task object when it happens. This could be an array of objects/strings
*/

export interface ITask {
  _id?: Types.ObjectId;
  title: string;
  status: TaskStatus;
  reverted: boolean; // default false - reversions create a separate event object to track history
}

const Task = new Schema<ITask>(
  {
    title: { type: String, required: true },
    status: { type: String, required: true, default: TaskStatus.QUEUED },
    reverted: { type: Boolean, required: true, default: false },
  },
  { collection: "task" }
);

export default model<ITask>("Task", Task);
