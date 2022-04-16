// main task update methods + task execution method
// task execution method should refernce a "decide method" method

import { Action, ActionMethod } from "../../../types";

class TaskInterface {
  public static createTask() {}

  public static findTasks() {}

  public static findTaskById() {}

  public static updateTaskById() {}

  public static executeTask() {
    // update task with status field + create event saying task started, and then resolve to say that task was "started"
    // call method on task
    // when method is done, update task and create new event saying task completed
  }

  private static executeInterfaceMethod(action: Action) {
    // based on an action, execute a method from another interface,
    // passing the data of the action to that method.
    // tasks act as delayed/cached data with context/metadata
  }

  private static determineInterfaceMethod(actionMethod: ActionMethod) {
    // determine with method to use on another interface to complete a task,
    // returning that method just to keep the code more visually separate
  }
}
