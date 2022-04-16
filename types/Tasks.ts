interface Action {
  method: ActionMethod;
  data: object | object[];
}

enum ActionMethod {
  LINK_CREATE = "LINK_CREATE",
  LINK_DELETE = "LINK_DELETE",
}

enum TaskStatus {
  // main statuses that are required
  COMPLETE = "COMPLETE", // completed
  FAILED = "FAILED", // there was some error that caused the task to fail
  QUEUED = "QUEUED", // the task will occur pending conditions
  RUNNING = "RUNNING", // the task is currently running
  // optional statuses
  WAITING = "WAITING", // the task is waiting on another task, service, request, etc.
}

export { Action, ActionMethod, TaskStatus };
